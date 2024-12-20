import {
  Toilet,
  Flag,
  Flame,
  Angry,
  Smartphone,
  GitPullRequestCreateArrow,
} from "lucide-react";
import Link from "next/link";

export function FooterFlags({ copyrightHref = "/" }) {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <div className="max-w-3xl p-6 mt-3">
        <div className="flex gap-4 items-center justify-center">
          {copyrightHref === "/" && (
            <Link href={"/"} className="text-blue-500 hover:text-blue-800">
              <Flag size={24} />
            </Link>
          )}
          <a
            href="https://www.mapplerk3.com/minjumap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-800"
          >
            <Toilet size={24} />
          </a>
          <a
            href="https://candle.btsroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-800"
          >
            <Flame size={24} />
          </a>
          <a
            href="https://www.yna.co.kr/view/AKR20241212062700001?section=politics/all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-800"
          >
            <Angry size={24} />
          </a>
          <a
            href="https://nodong.org/notice/7872937"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-800"
          >
            <Smartphone size={24} />
          </a>
          <a
            href="https://github.com/dMario24/flag123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-800"
          >
            <GitPullRequestCreateArrow size={24} />
          </a>
        </div>

        <p className="text-sm text-gray-600 mt-3 text-center">
          {/* &copy; 12.3, <a href={copyrightHref} className="text-blue-500 hover:underline">어디서 도대체 무얼</a> */}
          <Link href={"https://spurious-ziconium-e0f.notion.site/15474ccf5596800abecffbfb5c11fec5"} className="text-red-500 hover:underline">
            집회 준비와 위기 시 행동 요령
          </Link>
        </p>

        <p className="text-sm text-gray-600 mt-3 text-center">
          <Link href={copyrightHref} className="text-blue-500 hover:underline">
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
      </div>
    </footer>
  );
}
