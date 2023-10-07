import { gql } from '@apollo/client';

export const logout = gql(/* GraphQL */ `
  mutation logoutUser {
    logout
  }
`);
