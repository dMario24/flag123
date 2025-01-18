import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;
// import { getToken } from 'next-auth/jwt';

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // 이 경로들에만 미들웨어가 적용됩니다.
  matcher: [
    // "/api/flags",
    // "/api/flags/imgbb",
    // "/api/flags/insert",
    // "/admin",
    // '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    '/((?!_next/static|_next/image|.*\\.png$).*)',
  ], // 이 경로들에만 미들웨어가 적용됩니다.
};

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/api/flags")) {
//     const headerKey = request.headers.get("Authorization")?.split(" ")[1];
//     const queryKey = request.nextUrl.searchParams.get("k123");

//     const apiKey = process.env.NEXT_PUBLIC_F123_API_KEY || "날리면";
//     if (headerKey === apiKey || queryKey === apiKey) {
//       return NextResponse.next(); // 인증 성공
//     }
//     return NextResponse.redirect(`${process.env.BASE_URL}/403`); // 인증 실패
//   }

//   const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

//   // /admin 경로에 대한 인증 처리
//   if (pathname.startsWith('/admin')) {
//     if (!token) {
//       // 인증되지 않은 사용자는 /login 페이지로 리다이렉트
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   }


//   // /login 경로에 대한 인증후 admin 이동 처리
//   if (pathname.startsWith('/login')) {
//     const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
//     if (token) {
//       // 인증된 사용자는 /admin 페이지로 리다이렉트
//       return NextResponse.redirect(new URL('/admin', request.url));
//     }
//   }

//   // For all other paths, continue without interruption
//   return NextResponse.next();
// }
