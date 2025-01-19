import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// https://authjs.dev/getting-started/installation?framework=Next.js
// 세션을 활성 상태로 유지하기 위해 선택적 미들웨어를 추가합니다. 이렇게 하면 호출될 때마다 세션 만료 시간이 업데이트됩니다.
// export { auth as middleware } from "@/auth"; 

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

