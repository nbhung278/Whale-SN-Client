"use client";

import { gql, DocumentNode } from "@apollo/client";

export const REGISTER_USER: DocumentNode = gql`
  mutation RegisterUser(
    $name: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
    $address: String!
    $bio: String!
    $gender: Float!
    $birthDate: DateTime!
  ) {
    register(
      registerDto: {
        name: $name
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
        password: $password
        address: $address
        bio: $bio
        gender: $gender
        birthDate: $birthDate
      }
    ) {
      activation_token
    }
  }
`;
