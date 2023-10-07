import { gql } from '@apollo/client';

export const updateUserProfile = gql(/* GraphQL */ `
  mutation UpdateProfile($fullName: String!, $file: Upload) {
    updateProfile(updateProfileInput: { fullName: $fullName, file: $file }) {
      id
      fullName
      avatarUrl
    }
  }
`);
