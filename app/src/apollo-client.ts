import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { useUserStore } from './stores/user-store';
import { onError } from '@apollo/client/link/error';

loadErrorMessages();
loadDevMessages();

const GRAPHQL_URL = 'localhost:3000/graphql';

const generateRefreshToken = async (
  client: ApolloClient<NormalizedCacheObject>,
) => {
  try {
    const {
      data: { refreshToken },
    } = await client.mutate({
      mutation: gql`
        mutation RefreshToken {
          refreshToken
        }
      `,
    });

    if (!refreshToken) {
      throw new Error('Access token not found');
    }

    return `Bearer ${refreshToken}`;
  } catch (err) {
    throw new Error('Failed to refresh token');
  }
};

let retryCount = 0;
const maxRetry = 3;

const webSocketLink = new GraphQLWsLink(
  createClient({
    url: `ws://${GRAPHQL_URL}`,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  }),
);

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) {
    return;
  }

  for (const err of graphQLErrors) {
    if (err.extensions.code === 'UNAUTHENTICATED' && retryCount < maxRetry) {
      retryCount++;

      return new Observable((observer) => {
        generateRefreshToken(client)
          .then((token) => {
            console.log('Token', token); // TODO: remove after tests
            operation.setContext((previousContext: any) => ({
              headers: {
                ...previousContext.headers,
                authorization: token,
              },
            }));

            forward(operation).subscribe(observer);
          })
          .catch((error) => observer.error(error));
      });
    }

    if (err.message === 'Refresh token not found') {
      console.log('Refresh token not found!'); // TODO: remove after tests
      useUserStore.setState({
        id: undefined,
        fullName: '',
        email: '',
      });
    }
  }
});

const uploadLink = createUploadLink({
  uri: `http://${GRAPHQL_URL}`,
  credentials: 'include',
  headers: {
    'apollo-require-preflight': 'true',
  },
});

const link = split(
  // Split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  webSocketLink,
  ApolloLink.from([errorLink, uploadLink]),
);

export const client = new ApolloClient({
  uri: `http://${GRAPHQL_URL}`,
  cache: new InMemoryCache({}),
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  link,
});
