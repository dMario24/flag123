import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log('redirect', url, baseUrl);
    //   // // 로그인 후 /admin 페이지로 리다이렉트
    //   // if (url === baseUrl || url === '/') {
    //   //   return `${baseUrl}`; // 로그인 후 /admin으로 리다이렉트
    //   // }

    //   // 로그인 페이지로 가는 루프 방지
    //   if (url === `${baseUrl}/login`) {
    //     return `${baseUrl}/admin`; // 로그인 페이지에서 리다이렉트되지 않도록 처리
    //   }
    //   return url;
    // },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      if (!isLoggedIn && isOnAdmin) {
        // ✅ 비로그인 상태에서 /admin 접근 시 로그인 페이지로 리다이렉트
        console.log("✅ 비로그인 상태에서 /admin 접근 시 로그인 페이지로 리다이렉트");
        return Response.redirect(new URL('/404', nextUrl));
      }

      if (isLoggedIn && isOnLogin) {
        // ✅ 로그인 상태에서 /login 접근 시 /admin으로 리다이렉트
        console.log("✅ 로그인 상태에서 /login 접근 시 /admin으로 리다이렉트");
        return Response.redirect(new URL('/admin', nextUrl));
      }
      console.log("authorized return true");
      return true;
    },
  },
} satisfies NextAuthConfig;
