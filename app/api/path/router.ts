import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  
  // 쿼리 파라미터로 받은 `redirectTo` 값을 통해 리다이렉션 URL을 결정
  const redirectTo = url.searchParams.get('redirectTo') || '/default'; // 기본 URL로 리다이렉트

  // 리다이렉션 응답을 반환
  return NextResponse.json({ redirectTo });
}
