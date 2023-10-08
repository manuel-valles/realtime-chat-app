import { useGeneralStore } from '../stores/general-store.ts';
import { useState } from 'react';
import { Button, Grid, Group, Modal, Paper, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUserStore } from '../stores/user-store.ts';
import { GraphQLErrorExtensions } from 'graphql/error';
import { useMutation } from '@apollo/client';
import { register } from '../graphql/mutations/register';
import { LoginUserMutation, RegisterMutation } from '../gql/graphql.ts';
import { loginUser } from '../graphql/mutations/login.ts';

const AuthOverlay = () => {
  const isLoginModalOpen = useGeneralStore((state) => state.isLoginModalOpen);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  const [isRegister, setIsRegister] = useState(true);
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const Register = () => {
    const form = useForm({
      initialValues: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validate: {
        fullName: (value: string) =>
          value.trim().length >= 3 ? null : 'Username must be at least 3 characters',
        email: (value: string) => (value.includes('@') ? null : 'Invalid email'),
        password: (value: string) =>
          value.trim().length >= 3 ? null : 'Password must be at least 3 characters',
        confirmPassword: (value: string, values) =>
          value.trim().length >= 3 && value === values.password ? null : 'Passwords do not match',
      },
    });

    const setUser = useUserStore((state) => state.setUser);
    const setIsLoginOpen = useGeneralStore((state) => state.toggleLoginModal);

    const [errors, setErrors] = useState<GraphQLErrorExtensions>({});

    const [registerUser, { loading }] = useMutation<RegisterMutation>(register);

    const handleRegister = async () => {
      setErrors({});

      await registerUser({
        variables: {
          fullName: form.values.fullName,
          email: form.values.email,
          password: form.values.password,
          confirmPassword: form.values.confirmPassword,
        },
        onCompleted: ({ register: { user } }) => {
          setErrors({});
          if (user)
            setUser({
              id: user.id,
              fullName: user.fullName,
              email: user.email,
            });
          setIsLoginOpen();
        },
      }).catch(({ graphQLErrors }) => {
        console.error(graphQLErrors, 'ERROR'); // TODO: Remove after testing
        setErrors(graphQLErrors[0]?.extensions);
        useGeneralStore.setState({ isLoginModalOpen: true });
      });
    };

    return (
      <Paper>
        <Text ta="center" size="xl">
          Register
        </Text>
        <form onSubmit={form.onSubmit(() => handleRegister())}>
          <Grid mt={20}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Full Name"
                placeholder="Choose a full name"
                {...form.getInputProps('fullName')}
                error={form.errors.username || (errors?.username as string)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                autoComplete="off"
                label="Email"
                placeholder="Enter your email"
                {...form.getInputProps('email')}
                error={form.errors.email || (errors?.email as string)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                autoComplete="off"
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...form.getInputProps('password')}
                error={form.errors.password || (errors?.password as string)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                {...form.getInputProps('confirmPassword')}
                error={form.errors.confirmPassword || (errors?.confirmPassword as string)}
                autoComplete="off"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Button variant="transparent" onClick={toggleForm} p={0}>
                Already registered? Login here
              </Button>
            </Grid.Col>
          </Grid>

          <Group mt={20}>
            <Button variant="outline" color="blue" type="submit" disabled={loading}>
              Register
            </Button>
            <Button variant="outline" color="red">
              Cancel
            </Button>
          </Group>
        </form>
      </Paper>
    );
  };

  const Login = () => {
    const form = useForm({
      initialValues: {
        email: '',
        password: '',
      },
      validate: {
        email: (value: string) => (value.includes('@') ? null : 'Invalid email'),
        password: (value: string) =>
          value.trim().length >= 3 ? null : 'Password must be at least 3 characters',
      },
    });

    const setUser = useUserStore((state) => state.setUser);
    const setIsLoginOpen = useGeneralStore((state) => state.toggleLoginModal);

    const [errors, setErrors] = useState<GraphQLErrorExtensions>({});
    const [invalidCredentials, setInvalidCredentials] = useState('');

    const [login, { loading }] = useMutation<LoginUserMutation>(loginUser);

    const handleLogin = async () => {
      setErrors({});

      await login({
        variables: {
          email: form.values.email,
          password: form.values.password,
        },
        onCompleted: ({ login: { user } }) => {
          setErrors({});
          if (user)
            setUser({
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              avatarUrl: user.avatarUrl,
            });
          setIsLoginOpen();
        },
      }).catch(({ graphQLErrors }) => {
        console.error(graphQLErrors, 'ERROR'); // TODO: Remove after testing
        const extensionsErrors = graphQLErrors[0]?.extensions;
        setErrors(extensionsErrors);
        if (extensionsErrors?.invalidCredentials) {
          setInvalidCredentials(extensionsErrors?.invalidCredentials);
        }
        useGeneralStore.setState({ isLoginModalOpen: true });
      });
    };

    return (
      <Paper>
        <Text ta="center" size="xl">
          Login
        </Text>
        <form onSubmit={form.onSubmit(() => handleLogin())}>
          <Grid mt={20}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                autoComplete="off"
                label="Email"
                placeholder="Enter your email"
                {...form.getInputProps('email')}
                error={form.errors.email || (errors?.email as string)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                autoComplete="off"
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...form.getInputProps('password')}
                error={form.errors.password || (errors?.password as string)}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text c="red">{invalidCredentials}</Text>
            </Grid.Col>

            <Grid.Col span={12}>
              <Button variant="transparent" onClick={toggleForm} p={0}>
                Not registered yet? Register here
              </Button>
            </Grid.Col>
          </Grid>

          <Group mt={20}>
            <Button variant="outline" color="blue" type="submit" disabled={loading}>
              Login
            </Button>
            <Button variant="outline" color="red" onClick={toggleLoginModal}>
              Cancel
            </Button>
          </Group>
        </form>
      </Paper>
    );
  };

  return (
    <Modal centered opened={isLoginModalOpen} onClose={toggleLoginModal}>
      {isRegister ? <Register /> : <Login />}
    </Modal>
  );
};

export default AuthOverlay;
