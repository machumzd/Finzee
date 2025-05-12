import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  // If user is logged in and trying to access /auth, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If not logged in and trying to access a protected route
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth", "/dashboard/:path*"], // Add /auth to matcher
};
