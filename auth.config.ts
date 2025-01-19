import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request }: { auth: any; request: Request }) {
      const isLoggedIn = !!auth?.user;
      const nextUrl = new URL(request.url); // URL 객체 생성
      const pathname = nextUrl.pathname;
      const isOnAdmin = pathname.startsWith('/admin');
      const isOnLogin = pathname.startsWith('/login');
      const isApiFlags = pathname.startsWith("/api/flags");

      if (!isLoggedIn && isOnAdmin) {
        // ✅ 비로그인 상태에서 /admin 접근 시 로그인 페이지로 리다이렉트
        // console.log("✅ 비로그인 상태에서 /admin 접근 시 로그인 페이지로 리다이렉트");
        return Response.redirect(new URL('/404', nextUrl));
      }

      // ✅ 로그인 상태에서 /login 접근 시 /admin으로 리다이렉트
      if (isLoggedIn && isOnLogin) {
        // console.log("✅ 로그인 상태에서 /login 접근 시 /admin으로 리다이렉트");
        const previous = nextUrl.searchParams.get('previous') || '/admin'; // 기본값은 '/admin'
        return NextResponse.redirect(new URL(previous, nextUrl.origin));
        // return NextResponse.redirect(new URL('/admin', nextUrl));
      }

      // Custom authentication for `/api/flags`
      if (isApiFlags) {
        const headerKey = request.headers.get("Authorization")?.split(" ")[1];
        const queryKey = nextUrl.searchParams.get("k123");

        const apiKey = process.env.NEXT_PUBLIC_F123_API_KEY || "날리면";
        if (headerKey === apiKey || queryKey === apiKey) {
          return NextResponse.next(); // 인증 성공
        }
        return NextResponse.redirect(new URL('/403', nextUrl)); // 인증 실패
      }

      // console.log("authorized return true");
      return true;
    },
  },
} satisfies NextAuthConfig;
