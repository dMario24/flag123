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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // if (!isLoggedIn && isOnAdmin) {
      //   // ✅ 비로그인 상태에서 /admin 접근 시 로그인 페이지로 리다이렉트
      //   console.log("✅ 비로그인 상태에서 /admin 접근 시 로그인 페이지로 리다이렉트");
      //   return Response.redirect(new URL('/404', nextUrl));
      // }

      if (isLoggedIn && isOnLogin) {
        // ✅ 로그인 상태에서 /login 접근 시 /admin으로 리다이렉트
        console.log("✅ 로그인 상태에서 /login 접근 시 /admin으로 리다이렉트");
        // return Response.redirect(new URL('/admin', nextUrl));
        return NextResponse.redirect(new URL('/admin', nextUrl));
      }
      console.log("authorized return true");
      return true;
    },
  },
} satisfies NextAuthConfig;


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
