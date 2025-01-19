"use server";

import { getBaseCamp, getVersion, joinUrl } from "@/lib/utils";
import {
  CreditCard,
  Toilet,
  Flame,
  Angry,
  Smartphone,
  GitPullRequestCreateArrow,
  // PowerIcon as LoginIcon,
  PowerOffIcon as LogOutIcon,
  LayoutDashboard as AdminIcon
} from "lucide-react";
import Link from "next/link";
import Href from "./href";
import A from "./a";
import IfLink from "./if-link";
import IfLinkSize from "./if-link-size";
import { signOut, auth } from '@/auth';
import LoginLink from "./login-link";
// import { useRouter } from 'next/router'; // client-side routing
// import { useRouter } from 'next/navigation';

// async function fetchData() {
//   const res = await fetch(`${process.env.BASE_URL}/api/auth`);
//   const data = await res.json();
//   return data;
// }

const BASE_CAMP = getBaseCamp();
const VERSION = getVersion();
const COMMIT_HASH = process.env.COMMIT_HASH || "𓆝 𓆟 𓆞 𓆝 𓆟";
const BUILD_TIME = process.env.BUILD_TIME || "👨‍💻🎲🕒🦾🟢";

export async function Footer() {
  const session = await auth();  // getServerSession 대신 auth() 사용
  const isLoggedIn = !!session?.user;

  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <div className="max-w-3xl p-6 mt-3">
        <div className="flex gap-4 items-center justify-center">
          <IfLink />
          <A url="https://www.redcard.kr/flag-flex" color={"red"} txt={<CreditCard size={24} />} />
          <A url="https://www.mapplerk3.com/minjumap" color={"blue"} txt={<Toilet size={24} />} />
          <A url="https://candle.btsroad.com" color={"pink"} txt={<Flame size={24} />} />
          <A url="https://www.yna.co.kr/view/AKR20241212062700001?section=politics/all" color={"purple"} txt={<Angry size={24} />} />
          <A url="https://nodong.org/notice/7872937" color={"green"} txt={<Smartphone size={24} />} />
          <A url={BASE_CAMP} color={"yellow"} txt={<GitPullRequestCreateArrow size={24} />} />

          {isLoggedIn ? (
            <div className="flex gap-4 items-center">
              {/* 관리자 페이지 링크 */}
              <Link href="/admin" className="flex items-center">
                <AdminIcon size={24} className="text-blue-500 hover:scale-200" />
              </Link>

              {/* 로그아웃 버튼 */}
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
                className="flex"
              >
                <button>
                  <LogOutIcon size={24} className={`text-pink-500 hover:text-red-500`} />
                </button>
              </form>
            </div>
          ) : (
            // <Link href="/login" className="flex items-center">
            //   <LoginIcon size={24} className="text-blue-500 hover:scale-150" />
            // </Link>
            <LoginLink />
          )}


        </div>

        <p className="text-sm text-gray-600 mt-3 text-center">
          {/* &copy; 12.3, <a href={copyrightHref} className="text-blue-500 hover:underline">어디서 도대체 무얼</a> */}
          <Link href={"https://spurious-ziconium-e0f.notion.site/15474ccf5596800abecffbfb5c11fec5"} className="text-red-500 hover:underline">
            집회 준비와 위기 시 행동 요령
          </Link>
        </p>

        <IfLinkSize />

        <Href url="https://www.heritage.go.kr/heri/cul/culSelectDetail.do?pageNo=1_1_2_0&ccbaCpno=1333302350000" txt={`🕒${BUILD_TIME}`} />
        <Href url={joinUrl(BASE_CAMP, "tree", COMMIT_HASH)} txt={`📌${COMMIT_HASH}`} />
        <Href url={joinUrl(BASE_CAMP, "releases/tag", VERSION)} txt={`🏷️${VERSION}`} />

      </div>
    </footer>
  );
}
