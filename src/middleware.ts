import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { isAdminPath } from "@/lib/admin-paths";

/** 회원 전용 경로 패턴 */
const AUTH_REQUIRED_PATTERNS = [
  /^\/diary\/write/,
  /^\/diary\/topic/,
  /^\/profile/,
  /^\/shop/,
  /^\/wardrobe/,
  /^\/community/,
  /^\/study/,
  /^\/learning/,
];

/** NextAuth 세션 쿠키 이름
 * __Secure- 프리픽스는 HTTPS에서만 브라우저가 저장하므로
 * HTTP(localhost 등) 환경에서는 일반 쿠키명 사용.
 * 두 케이스를 모두 확인하여 환경 의존성 제거.
 */
const SESSION_COOKIES = [
  "__Secure-next-auth.session-token",
  "next-auth.session-token",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSessionCookie = SESSION_COOKIES.some((name) => req.cookies.get(name)?.value);

  // ─── Admin 경로 보호 ───
  if (isAdminPath(pathname)) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  // ─── 회원 전용 경로 보호 ───
  const needsAuth = AUTH_REQUIRED_PATTERNS.some((p) => p.test(pathname));
  if (needsAuth) {
    if (!hasSessionCookie) {
      const signInUrl = new URL("/login", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/diary/write/:path*",
    "/diary/topic/:path*",
    "/profile/:path*",
    "/shop/:path*",
    "/wardrobe/:path*",
    "/community/:path*",
    "/study/:path*",
    "/learning/:path*",
  ],
};
