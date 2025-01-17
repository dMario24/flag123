'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function IfLinkSize() {
    const pathname = usePathname();

    // currentPath가 '/'가 아니면 '/''로 설정
    const validHref = pathname === "/" ? "/123" : "/";
    return (
        <p className="text-sm text-gray-600 mt-3 text-center">
          <Link href={validHref} className="text-blue-500 hover:underline">
            <span className="hidden lg:block">
              &copy; 12.3 계엄배 천하제일 재기발랄 깃발대회 by 민주주의 해방전선 나만 깃발 없엉 총연맹
            </span>
            <span className="hidden sm:block lg:hidden">
              &copy; 12.3 계엄배 천하제일 깃발대회 by 민주주의 해방전선 나만 깃발 없엉 총연맹
            </span>
            <span className="sm:hidden">
              &copy; 12.3 계엄배 천하제일 깃발대회 by 깃없총
            </span>
          </Link>
        </p>
    );
}