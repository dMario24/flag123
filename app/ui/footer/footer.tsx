'use client'

import { getBaseCamp, getVersion, joinUrl } from "@/lib/utils";
import {
  CreditCard,
  Toilet,
  Flag,
  Flame,
  Angry,
  Smartphone,
  GitPullRequestCreateArrow,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Href from "./href";
import A from "./a";

const BASE_CAMP = getBaseCamp();
const VERSION = getVersion();
const COMMIT_HASH = process.env.COMMIT_HASH || "𖢊 𖥣 𖣣 𖤣 𖤥 𖡡 𖧹";
const BUILD_TIME = process.env.BUILD_TIME || "▄︻デ══━一💥";

export function Footer() {
  const pathname = usePathname();

  // currentPath가 '/'가 아니면 '/''로 설정
  const validHref = pathname === "/" ? "/123" : "/";
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <div className="max-w-3xl p-6 mt-3">
        <div className="flex gap-4 items-center justify-center">
          {validHref === "/" && (
            <Link href={"/"} className="text-blue-500 hover:text-blue-800">
              <Flag size={24} />
            </Link>
          )}
          <A url="https://www.redcard.kr/flag-flex" color="red" txt={<CreditCard size={24} />} />
          <A url="https://www.mapplerk3.com/minjumap" color="blue" txt={<Toilet size={24} />} />
          <A url="https://candle.btsroad.com" color="pink" txt={<Flame size={24} />} />
          <A url="https://www.yna.co.kr/view/AKR20241212062700001?section=politics/all" color="purple" txt={<Angry size={24} />} />
          <A url="https://nodong.org/notice/7872937" color="green" txt={<Smartphone size={24} />} />
          <A url={BASE_CAMP} color="yellow" txt={<GitPullRequestCreateArrow size={24} />} />
        </div>

        <p className="text-sm text-gray-600 mt-3 text-center">
          {/* &copy; 12.3, <a href={copyrightHref} className="text-blue-500 hover:underline">어디서 도대체 무얼</a> */}
          <Link href={"https://spurious-ziconium-e0f.notion.site/15474ccf5596800abecffbfb5c11fec5"} className="text-red-500 hover:underline">
            집회 준비와 위기 시 행동 요령
          </Link>
        </p>

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


        <Href url="https://www.heritage.go.kr/heri/cul/culSelectDetail.do?pageNo=1_1_2_0&ccbaCpno=1333302350000" txt={`🕒${BUILD_TIME}`} />
        <Href url={joinUrl(BASE_CAMP, "tree", COMMIT_HASH)} txt={`📌${COMMIT_HASH}`} />
        <Href url={joinUrl(BASE_CAMP, "releases/tag", VERSION)} txt={`🏷️${VERSION}`} />

      </div>

    </footer>
  );
}
