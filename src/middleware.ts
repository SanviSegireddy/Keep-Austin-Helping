import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const url = req.nextUrl.clone();

  const publicRoutes = ["/sign-in", "/sign-up"];

  const privateRoutes = ["/users"];

  if (!token && privateRoutes.includes(url.pathname)) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.includes(url.pathname)) {
    url.pathname = "/users";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/users"],
};
