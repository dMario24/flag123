'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PowerIcon as LoginIcon } from 'lucide-react';

export default function LoginLink() {
  const pathname = usePathname(); // 현재 경로 가져오기
  const searchParams = useSearchParams(); // 현재 쿼리 파라미터 가져오기

  // 현재 경로와 쿼리 파라미터를 조합하여 `previous` 생성
  const currentUrl = `${pathname}?${searchParams.toString()}`;
  const loginUrl = `/login?previous=${encodeURIComponent(currentUrl)}`;
  console.log('loginUrl:', loginUrl);

  return (
    <Link href={loginUrl} className="flex items-center">
      <LoginIcon size={24} className="text-blue-500 hover:scale-150" />
    </Link>
  );
}
