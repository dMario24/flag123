import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // 이 경로들에만 미들웨어가 적용됩니다.
  matcher: [
    "/api/flags",
    "/api/flags/imgbb",
    "/api/flags/insert",
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ], // 이 경로들에만 미들웨어가 적용됩니다.
};

export async function middleware(request: NextRequest) {
  const headerKey = request.headers.get("Authorization")?.split(" ")[1];
  const queryKey = request.nextUrl.searchParams.get("k123");

  const apiKey = process.env.NEXT_PUBLIC_F123_API_KEY || "날리면";
  if (headerKey === apiKey || queryKey === apiKey) {
    return NextResponse.next(); // 인증 성공
  }

  return NextResponse.redirect(`${process.env.BASE_URL}/403`); // 인증 실패
}
