import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.headers.get("authorization")?.split(" ")[1]; // extract token (to skip "bearer" prefix)
  console.log(token);

  // define protected paths
  const protectedPaths = ["/dashboard"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

// to specify protected routes
export const config = {
  matcher: ["/dashboard"],
};
