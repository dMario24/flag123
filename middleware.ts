import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // 이 경로들에만 미들웨어가 적용됩니다.
  matcher: [
    // '/((?!api|_next/static|_next/image|.*\\.webp$).*)',
    '/((?!_next/static|_next/image).*)',

    // 이미지 파일들 제외 (jpg, jpeg, png, gif, webp, svg)
    // '!/**/*.{jpg,jpeg,png,gif,webp,svg}',
  ], 
};

