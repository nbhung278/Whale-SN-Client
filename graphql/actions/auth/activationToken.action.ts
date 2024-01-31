"use client";

import { gql, DocumentNode } from "@apollo/client";

export const VERIFY_USER: DocumentNode = gql`
  mutation verifyUser($activationToken: String!, $activationCode: String!) {
    activateUser(
      activationDto: {
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
      user {
        email
        name
        firstName
        lastName
        phoneNumber
        address
        gender
        bio
        birthDate
      }
    }
  }
`;
