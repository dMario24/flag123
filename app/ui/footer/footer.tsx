import { getBaseCamp, getVersion, joinUrl } from "@/lib/utils";
import {
  CreditCard,
  Toilet,
  Flame,
  Angry,
  Smartphone,
  GitPullRequestCreateArrow,
  PowerIcon,
  PowerOffIcon,
} from "lucide-react";
import Link from "next/link";
import Href from "./href";
import A from "./a";
import IfLink from "./if-link";
import IfLinkSize from "./if-link-size";
import { signOut } from '@/auth';

const BASE_CAMP = getBaseCamp();
const VERSION = getVersion();
const COMMIT_HASH = process.env.COMMIT_HASH || "𖢊 𖥣 𖣣 𖤣 𖤥 𖡡 𖧹";
const BUILD_TIME = process.env.BUILD_TIME || "▄︻デ══━一💥";

export function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <div className="max-w-3xl p-6 mt-3">
        <div className="flex gap-4 items-center justify-center">
          <IfLink />
          <A url="https://www.redcard.kr/flag-flex" color="red" txt={<CreditCard size={24} />} />
          <A url="https://www.mapplerk3.com/minjumap" color="blue" txt={<Toilet size={24} />} />
          <A url="https://candle.btsroad.com" color="pink" txt={<Flame size={24} />} />
          <A url="https://www.yna.co.kr/view/AKR20241212062700001?section=politics/all" color="purple" txt={<Angry size={24} />} />
          <A url="https://nodong.org/notice/7872937" color="green" txt={<Smartphone size={24} />} />
          <A url={BASE_CAMP} color="yellow" txt={<GitPullRequestCreateArrow size={24} />} />
          
          <Link href="/login" className="flex items-center">
            <PowerIcon size={24} className="text-green-500 hover:text-blue-500" />
          </Link>

          <form
            action={async () => {
              'use server';
              await signOut();
            }}
            className="flex"
          >
            <button>
              <PowerOffIcon size={24} className={`text-pink-500 hover:text-red-500`} />
            </button>
          </form>
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
