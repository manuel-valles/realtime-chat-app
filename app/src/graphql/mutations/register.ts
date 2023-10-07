import { gql } from '@apollo/client';

export const register = gql(/* GraphQL */ `
  mutation Register(
    $fullName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        fullName: $fullName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      user {
        id
        fullName
        email
      }
    }
  }
`);
