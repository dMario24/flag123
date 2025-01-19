import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: Request) {
  // getToken을 호출하여 JWT 토큰 가져오기
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  // 토큰이 있으면 로그인 상태, 없으면 비로그인 상태
  if (token) {
    return NextResponse.json({ loggedIn: true });
  } else {
    return NextResponse.json({ loggedIn: false });
  }
}
