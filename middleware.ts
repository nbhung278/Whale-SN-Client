import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get("access_token")?.value;
	const isProtectedRoute = !publicRoutes.includes(request.nextUrl.pathname);

	if (isProtectedRoute && !accessToken) {
		request.cookies.delete("access_token");

		const isAssetPath =
			request.nextUrl.pathname.startsWith("/_next") ||
			request.nextUrl.pathname.startsWith("/static");

		if (!isAssetPath) {
			const response = NextResponse.redirect(new URL("/sign-in", request.url));
			return response;
		}
	} else {
		if (authRoutes.includes(request.nextUrl.pathname) && accessToken) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}
}

export const authRoutes = ["/sign-in"];
export const publicRoutes = ["/sign-in", "/sign-up", "/forgot-password"];
