"use client";

import { gql, DocumentNode } from "@apollo/client";

export const RESET_PASSWORD: DocumentNode = gql`
  mutation ResetPassword($password: String!, $activationToken: String!) {
    resetPassword(
      resetPasswordDto: {
        password: $password
        activationToken: $activationToken
      }
    ) {
      user {
        name
        email
        password
      }
    }
  }
`;
