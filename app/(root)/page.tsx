"use client";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/actions/users/getUser.action";
import { useUserStore } from "@/store";
import { useEffect } from "react";

export default function Home() {
	const { loading, error, data } = useQuery(GET_USER);
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		if (data?.getLoggedInUser) setUser(data.getLoggedInUser?.user);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);
	return (
		<main>
			<h1>Hello</h1>
		</main>
	);
}
