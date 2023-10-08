import { useState } from 'react';
import { useGeneralStore } from '../stores/general-store';
import { useUserStore } from '../stores/user-store';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconBrandWechat,
  IconBrandMessenger,
  IconUser,
  IconLogout,
  IconLogin,
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import { useMutation } from '@apollo/client';
import { logout } from '../graphql/mutations/logout';

interface NavbarLinkProps {
  icon: typeof IconBrandWechat;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

const mockData = [{ icon: IconBrandWechat, label: 'Chat Rooms' }];

const Sidebar = () => {
  const user = useUserStore((state) => state);
  const userId = useUserStore((state) => state.id);
  const setUser = useUserStore((state) => state.setUser);

  const toggleProfileSettingsModal = useGeneralStore((state) => state.toggleProfileSettingsModal);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  const [logoutUser] = useMutation(logout, {
    onCompleted: () => {
      toggleLoginModal();
    },
  });
  const handleLogout = async () => {
    await logoutUser();
    setUser({
      id: undefined,
      fullName: '',
      email: '',
      avatarUrl: null,
    });
  };

  const [active, setActive] = useState(0);
  const links = mockData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <IconBrandMessenger type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {userId && links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        {userId ? (
          <>
            <NavbarLink
              icon={IconUser}
              label={`Profile(${user.fullName})`}
              onClick={toggleProfileSettingsModal}
            />
            <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
          </>
        ) : (
          <NavbarLink icon={IconLogin} label="Login" onClick={toggleLoginModal} />
        )}
      </Stack>
    </nav>
  );
};

export default Sidebar;
