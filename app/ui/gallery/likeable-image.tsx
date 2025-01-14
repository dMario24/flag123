'use client'

import { Flag } from "@/app/lib/definitions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { Heart, Info } from "lucide-react";
import Link from "next/link";
import { saveLinked } from "./saveLinked";
import { getImageQuality } from "@/lib/utils";

const IMAGE_QUALITY = getImageQuality();

export default function LikeableImage({ 
  flag, 
  detailButtonEnabled = true,
}: { 
  flag: Flag, 
  detailButtonEnabled?: boolean,
}) {

  const [liked, setLiked] = useState<boolean | null>(null); // 초기값을 null로 설정하여 로딩 상태 표현
  const [likeCount, setLikeCount] = useState(flag.like_count);
  const [animating, setAnimating] = useState(false);

  // 클라이언트에서 쿠키를 읽어 상태 초기화
  useEffect(() => {
    const isLiked = getLikedStatusFromCookies(flag.id);
    setLiked(isLiked === "true"); // 쿠키 값으로 초기화
  }, [flag.id]);


  // 좋아요 버튼 클릭 핸들러
  const toggleLike = () => {
    if (liked === null) return; // 로딩 상태 중에는 동작하지 않음
    // 애니메이션 활성화
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500); // 0.5초 후 애니메이션 비활성화

    const updatedLiked = !liked;
    saveLikedStatusToCookies(flag.id, updatedLiked);
    updateLocalStorage(flag.id, updatedLiked);
    setLikeCount((prev) => (updatedLiked ? Number(prev) + 1 : Number(prev) - 1));
    setLiked(updatedLiked);

    // saver one-by-one
    saveLinked();
  };


  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-gray-800 aspect-square">
      <Image
        src={flag.img_url}
        alt={flag.name}
        width={300}
        height={300}
        className="w-full h-full object-cover transition-transform duration-300"
        onClick={toggleLike}
        priority={false}
        // placeholder='blur'
        quality={IMAGE_QUALITY}
      />


      {/* 좋아요 버튼과 숫자 (이미지 좌측 하단) */}
      {likeCount > -1 &&
        (process.env.NEXT_PUBLIC_LIKE_BUTTON_ENABLED || "OFF") ===
        "ON" && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <button
              onClick={toggleLike}
              className={`flex items-center justify-center w-7 h-7 rounded-full ${liked
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-300"
                }`}
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-500 ${animating
                  ? "animate-heartbeat"
                  : "scale-100"
                  }`}
              />
            </button>
            {/* 말풍선 부분 */}
            <div className="relative flex items-center ml-2">
              {" "}
              {/* ml-2로 말풍선 위치 조정 */}
              <span className="text-white bg-blue-500 text-sm px-3 py-1 rounded-lg relative z-0">
                {likeCount}
              </span>
              {/* 말풍선 꼬리 */}
              <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-blue-500"></div>
            </div>

          </div>
        )}

      {/* Detail 버튼 (환경 변수로 ON/OFF) */}
      {detailButtonEnabled && (process.env.NEXT_PUBLIC_MAP_PINNED_ENABLED || "OFF") === "ON" && (
          <button
            // onClick={() =>
            //   console.log(`MapPinned clicked for ${flag.id}`)
            // }
            className="absolute bottom-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-gray-700 text-white hover:bg-blue-600"
          >
            <Link
              href={`/flags/${flag.id}/detail`}
              className="w-full h-full flex items-center justify-center"
            >
              <Info className="w-5 h-5" />
            </Link>
          </button>
        )}
    </div>
  );
}

const COOKIEKEY_PREFIX = 'LikedStatusV1_';

/**
 * 특정 플래그의 좋아요 상태를 브라우저 쿠키에 저장합니다.
 * 
 * @param flag_id - 좋아요 상태를 저장할 플래그의 ID.
 * @param updatedLiked - 플래그가 좋아요 상태인지 여부 (true: 좋아요, false: 좋아요 해제).
 * 
 * 쿠키는 1년간 유지되며, 사이트 전체 경로("/")에서 접근 가능합니다.
 */
function saveLikedStatusToCookies(
  flag_id: number,
  updatedLiked: boolean,
  cookieKeyPrefix = COOKIEKEY_PREFIX,
  cookieMaxAge = 31536000 // 365 * 24 * 60 * 60
) {
  setCookie(null, `${cookieKeyPrefix}${flag_id}`, String(updatedLiked), {
    maxAge: cookieMaxAge,
    path: "/",
  });
}

/**
 * 특정 플래그의 좋아요 상태를 브라우저 쿠키에서 가져옵니다.
 *
 * @param {number} flag_id - 플래그의 고유 식별자.
 * @returns {string | undefined} - 쿠키에서 가져온 좋아요 상태. 상태가 없으면 `undefined`를 반환합니다.
 *
 * 이 함수는 쿠키에서 `${COOKIEKEY_PREFIX}<flag_id>` 형식의 키를 확인하고, 
 * 해당 키에 연결된 값을 반환합니다. 이 값은 플래그가 좋아요 상태인지 여부를 나타냅니다.
 */
function getLikedStatusFromCookies(flag_id: number, cookieKeyPrefix = COOKIEKEY_PREFIX) {
  const cookies = parseCookies();
  const isLiked = cookies[`${cookieKeyPrefix}${flag_id}`];
  return isLiked;
}

/**
 * Updates the local storage to track like deltas for specific flags.
 * 
 * This function modifies the "like_deltas" object stored in local storage. It increments
 * or decrements the like delta for a given flag ID based on the user's action (like or unlike).
 * If the flag ID is not already present in the storage, it initializes the delta for that ID.
 * 
 * @param {number} flag_id - The unique identifier for the flag being liked or unliked.
 * @param {boolean} updatedLiked - A boolean indicating the updated like status:
 *                                  `true` for like, `false` for unlike.
 */
function updateLocalStorage(flag_id: number, updatedLiked: boolean) {
  const likeDelta = updatedLiked ? 1 : -1;
  const storedData = JSON.parse(localStorage.getItem("like_deltas") || "{}");

  storedData[flag_id] = (storedData[flag_id] || 0) + likeDelta;
  localStorage.setItem("like_deltas", JSON.stringify(storedData));
}