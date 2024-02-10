"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserStore } from "@/store";

const LeftSideBar = () => {
	const router = useRouter();
	const handleLogout = () => {
		Cookies.remove("access_token");
		Cookies.remove("refresh_token");
		router.push("/sign-in");
	};
	const pathname = usePathname();
	const user = useUserStore((state) => state.user);

	const sidebarLinks = [
		{
			imgURL: "/assets/home.svg",
			route: "/",
			label: "Home",
		},
		{
			imgURL: "/assets/search.svg",
			route: "/search",
			label: "Search",
		},
		{
			imgURL: "/assets/heart.svg",
			route: "/activity",
			label: "Activity",
		},
		{
			imgURL: "/assets/create.svg",
			route: "/create-thread",
			label: "Create Thread",
		},
		{
			imgURL: "/assets/community.svg",
			route: "/communities",
			label: "Communities",
		},
		{
			imgURL: "/assets/user.svg",
			route: `/profile/${user?.name}`,
			label: "Profile",
		},
		{
			imgURL: "/assets/user.svg",
			route: "/keys",
			label: "Keys",
		},
		{
			imgURL: "/assets/user.svg",
			route: "/streams",
			label: "Streams",
		},
	];

	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-6 px-6">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`leftsidebar_link  active:scale-95 transition ease-in-out ${
								isActive ? "bg-primary-500 " : "hover:bg-[rgb(30,30,30)]"
							}`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={24}
								height={24}
							/>

							<p className="text-light-1 max-lg:hidden">{link.label}</p>
						</Link>
					);
				})}
			</div>

			<div className="mt-10 px-6">
				<div className="flex cursor-pointer gap-4 p-4" onClick={handleLogout}>
					<Image src="/assets/logout.svg" alt="logout" width={24} height={24} />

					<p className="text-light-2 max-lg:hidden">Logout</p>
				</div>
			</div>
		</section>
	);
};

export default LeftSideBar;
