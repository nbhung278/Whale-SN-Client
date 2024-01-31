"use client";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function TopBar() {
	const router = useRouter();
	const handleLogout = () => {
		Cookies.remove("access_token");
		Cookies.remove("refresh_token");
		router.push("/sign-in");
	};
	return (
		<nav className="topbar">
			<Link href="/" className="flex items-center gap-4">
				<Image src="/logo.svg" alt="logo" width={28} height={28} />
				<p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
			</Link>

			<div className="flex items-center gap-1">
				<div className="block md:hidden">
					<div className="flex cursor-pointer" onClick={handleLogout}>
						<Image
							src="/assets/logout.svg"
							alt="logout"
							width={24}
							height={24}
						/>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default TopBar;
