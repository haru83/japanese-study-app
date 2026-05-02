import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { isAdminPath } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  if (isAdminPath(req.nextUrl.pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== "admin") {
      // Redirect non-admin users to home
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
