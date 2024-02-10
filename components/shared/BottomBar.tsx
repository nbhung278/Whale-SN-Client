"use client";

import { useUserStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BottomBar() {
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
		<section className="bottombar">
			<div className="bottombar_container">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;

					return (
						<Link
							href={link.route}
							key={link.label}
							className={`bottombar_link ${isActive && "bg-primary-500"}`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={16}
								height={16}
								className="object-contain"
							/>

							<p className="text-subtle-medium text-light-1 max-sm:hidden">
								{link.label.split(/\s+/)[0]}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

export default BottomBar;
