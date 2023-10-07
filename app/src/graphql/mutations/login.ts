import { gql } from '@apollo/client';

export const loginUser = gql(/* GraphQL */ `
  mutation loginUser($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      user {
        id
        fullName
        email
        avatarUrl
      }
    }
  }
`);
