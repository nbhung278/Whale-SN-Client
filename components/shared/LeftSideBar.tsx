"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "@/constants";

const LeftSideBar = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-6 px-6">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;
					if (link.route === "/profile") link.route = `${link.route}`;
					return (
						<Link
							href={"/"}
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
				<div className="flex cursor-pointer gap-4 p-4">
					<Image src="/assets/logout.svg" alt="logout" width={24} height={24} />

					<p className="text-light-2 max-lg:hidden">Logout</p>
				</div>
			</div>
		</section>
	);
};

export default LeftSideBar;
