import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("infolife")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (!token && (pathname.startsWith("/user") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/") {
    if (role === "USER") {
      return NextResponse.redirect(new URL("/user", request.url));
    }
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (role === "USER" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (role === "ADMIN" && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:path*", "/admin/:path*"],
};
