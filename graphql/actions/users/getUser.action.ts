"use client";

import { gql, DocumentNode } from "@apollo/client";

export const GET_USER: DocumentNode = gql`
	query {
		getLoggedInUser {
			user {
				id
				name
				firstName
				lastName
				bio
				phoneNumber
				gender
				birthDate
				email
				address
			}
		}
	}
`;

export const GET_USER_BY_NAME: DocumentNode = gql`
	query GetUserByName($name: String!) {
		getUserByName(getUserByNameDto: { name: $name }) {
			id
			name
			firstName
			lastName
			bio
			phoneNumber
			gender
			birthDate
			email
			address
		}
	}
`;
