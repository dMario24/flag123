import { getFlags } from "@/app/lib/getFlags";
import { fetchFlags } from "@/app/lib/data";
import SortableGallery from "@/app/ui/gallery/sortable-gallery";
import Gnb from "@/app/ui/gnb/gnb";
import { Flag } from "./lib/definitions";
import { getCacheTimeout } from "@/lib/utils";

export const fetchCache = 'force-no-store';

const CACHE_TIME_OUT = getCacheTimeout();  // 캐시 갱신 시간 (초 단위)
let cachedFlags: Flag[] | null = null; // 전역 변수로 선언하여 데이터 유지
let lastFetchTime: number = Date.now();  // 마지막 데이터 조회 시간을 추적

export default async function Home(props: {
  searchParams?: Promise<{
    query: string,
  }>
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  let flags;

  const timeElapsed = (Date.now() - lastFetchTime) / 1000; // 초 단위로 경과 시간 계산
  const isRefreshTimeout = timeElapsed >= CACHE_TIME_OUT;
  if (isRefreshTimeout || !cachedFlags) {
    try {
      flags = await fetchFlags();
      cachedFlags = flags; // 데이터를 캐싱
      lastFetchTime = Date.now();  // 마지막 조회 시간을 업데이트
    } catch (error) {
      flags = await getFlags(); // Fallback to getFlags if fetchFlags fails
      console.error('fetchFlags failed, using getFlags as fallback:', error);
    }
    // console.log("use no ~~~~~~~~~~~~~~~~~~~~~ cachedFlags");
  } else {
    // console.log("use cachedFlags");
    flags = cachedFlags;
  }
  const totalFlags = flags.length;
  const totalLikes = flags.reduce((sum, flag) => sum + Number(flag.like_count), 0);

  // query를 이용해서 cachedFlags에서 필터링
  const filteredFlags = flags.filter(flag =>
    flag.name.replace(/\s+/g, '').toLowerCase().includes(query.replace(/\s+/g, '').toLowerCase()) // 좌우 공백 제거
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Gnb total_flags={totalFlags} total_likes={totalLikes} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SortableGallery filteredFlags={filteredFlags} />
      </main>
    </div>
  );
}
