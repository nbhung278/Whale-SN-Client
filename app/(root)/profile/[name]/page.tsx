"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_NAME } from "@/graphql/actions/users/getUser.action";
import { useParams } from "next/navigation";
import { UserTypes } from "@/types/user.types";
import NotFoundPage from "@/components/NotFoundPage";

const Profile = () => {
	const params = useParams();
	const { loading, error, data } = useQuery(GET_USER_BY_NAME, {
		variables: {
			name: params?.name,
		},
	});
	const [user, setUser] = useState<UserTypes | null>(data);
	useEffect(() => {
		if (data?.getUserByName) {
			setUser(data?.getUserByName);
		}
	}, [data]);

	console.log("re-render");

	return <>{!loading && !user ? <NotFoundPage /> : <div>{user?.name}</div>}</>;
};

export default Profile;
