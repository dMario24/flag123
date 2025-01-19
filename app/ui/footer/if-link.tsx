'use client';
import { Flag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function IfLink() {
    const pathname = usePathname();

    // currentPath가 '/'가 아니면 '/''로 설정
    const validHref = pathname === "/" ? "/123" : "/";
    return (
        <>
            {validHref === "/" && (
                <Link href={"/"} className="text-blue-500 hover:text-blue-800">
                    <Flag size={24} />
                </Link>
            )}
        </>
    );
}