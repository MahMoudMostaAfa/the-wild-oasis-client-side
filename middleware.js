import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";
export async function middleware(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname === "/login" && session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/account") && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/cabins/thankyou" && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if (pathname === "/signout" && !session?.user) {
  // return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/account/:path*", "/cabins/thankyou"],
};
