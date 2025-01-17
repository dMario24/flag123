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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdmin && !isLoggedIn) {
        // ✅ 비로그인 상태에서 /admin 접근 시 로그인 페이지로 리다이렉트
        return Response.redirect(new URL('/login', nextUrl));
      }
      
      return true;
    },
  },
} satisfies NextAuthConfig;
