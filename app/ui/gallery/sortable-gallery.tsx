'use client'

import { Flag } from "@/app/lib/definitions";
import LikeableImage from "./likeable-image";
import { useEffect, useState } from "react";
import { isImageAllDownButtonEnabled } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import JSZip from "jszip"; // ZIP 파일 생성 라이브러리
import { saveAs } from "file-saver"; // 파일 다운로드 라이브러리
import { saveLinked } from "./saveLinked";
import { getImageQuality } from "@/lib/utils";

const IMAGE_QUALITY = getImageQuality();
const ENABLE_IMAGE_ALL_DOWN_BUTTON = isImageAllDownButtonEnabled();

interface FlagsProps {
  filteredFlags: Flag[];
}

export default function SortableGallery({ filteredFlags }: FlagsProps) {
  const searchParams = useSearchParams();
  const [sortedFlags, setSortedFlags] = useState<Flag[]>(filteredFlags);

  const downloadAllImages = async () => {
    const zip = new JSZip();
    // let completed = 0; // 진행 상황 추적
    // const total = sortedFlags.length;
    const sqlStatements: string[] = []; // SQL INSERT 문을 저장할 배열

    // 알림: 다운로드 시작
    alert("이미지 다운로드를 시작합니다. 완료될 때까지 기다려 주세요.");

    // 이미지 다운로드 및 SQL INSERT 문 생성
    for (let i = 0; i < sortedFlags.length; i++) {
      const flag = sortedFlags[i];
      try {
        // next/image 최적화된 이미지 경로 생성
        const optimizedUrl = `/_next/image?url=${encodeURIComponent(flag.img_url)}&w=384&q=${IMAGE_QUALITY}`;

        const response = await fetch(optimizedUrl); // 최적화된 이미지 경로 요청
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();

        // 이미지 이름을 4자리 형식으로 설정 (예: 0001.webp, 0002.webp)
        const imageName = String(i + 1).padStart(4, "0") + ".webp";
        zip.file(imageName, blob);


        // SQL INSERT 문 생성
        // flag.name에 포함된 싱글 퀘테이션을 이스케이프 처리
        const safeName = flag.name.replace(/'/g, "''");
        const insertSql = `INSERT INTO flags (name, latitude, longitude, img_url) VALUES ('${safeName}', 37.525307 + (37.530139 - 37.525307) * RANDOM(), 126.919467 + (126.922896 - 126.919467) * RANDOM(), '/images/flags/${imageName}');`;
        sqlStatements.push(insertSql);

        // 진행 상황 로깅
        // completed++;
        // console.log(`Downloaded ${completed}/${total}: ${flag.img_url}`);
      } catch (error) {
        console.error(`Failed to download image for flag ${flag.id}:`, error);
      }
    }

    // SQL 파일을 ZIP에 추가
    const sqlContent = sqlStatements.join("\n");
    zip.file("flags_insert.sql", sqlContent);

    // ZIP 파일 생성 및 다운로드
    zip.generateAsync({ type: "blob" }, (metadata) => {
      console.log(`ZIP progress: ${(metadata.percent).toFixed(2)}% complete.`);
    }).then((blob) => {
      saveAs(blob, "images.zip");

      // 알림: 다운로드 완료
      alert("모든 이미지가 성공적으로 다운로드되었습니다.");
    }).catch((error) => {
      console.error("Error generating ZIP file:", error);
      alert("ZIP 파일 생성 중 오류가 발생했습니다.");
    });
  };

  // Helper function: Parse cookies into an object
  const parseCookies = (): Record<string, string> => {
    return document.cookie
      .split("; ")
      .reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  };

  useEffect(() => {
    const sortParam = searchParams.get("sort") || "idDesc";
    const heartParam = searchParams.get("heart");

    const cookies = parseCookies();
    const likedFlags = new Set(
      Object.entries(cookies)
        .filter(([key, value]) => key.startsWith("LikedStatusV1_") && value === "true")
        .map(([key]) => parseInt(key.replace("LikedStatusV1_", ""), 10))
    );
    let filtered = [...filteredFlags];
    if (heartParam === "only") {
      // Show only liked flags
      filtered = filtered.filter((flag) => likedFlags.has(flag.id));
    } else if (heartParam === "none") {
      // Show only unliked flags
      filtered = filtered.filter((flag) => !likedFlags.has(flag.id));
    }

    // const filtered = [...filteredFlags];
    switch (sortParam) {
      case "idDesc":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "idAsc":
        filtered.sort((a, b) => a.id - b.id);
        break;
      case "desc":
        filtered.sort((a, b) => b.like_count - a.like_count);
        break;
      case "asc":
        filtered.sort((a, b) => a.like_count - b.like_count);
        break;
      case "shuffle":
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        break;
      default:
        console.warn(`Unknown sort parameter: ${sortParam}`);
    }
    setSortedFlags(filtered);
  }, [filteredFlags, searchParams]);

  // 좋아요 저장
  useEffect(() => {
    let isSaving = false; // 중복 방지 플래그

    const saveLikes = async () => {
      if (isSaving) return; // 이미 저장 중이면 실행하지 않음
      isSaving = true;

      saveLinked();

      isSaving = false; // 저장 완료 후 플래그 리셋
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // console.log("handleVisibilityChange");
        setTimeout(saveLikes, 1000); // 비동기 저장 지연
      }
    };
    const handlePagehide = () => {
      // console.log("handlePagehide");
      setTimeout(saveLikes, 1000); // 비동기 저장 지연
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // console.log("handleBeforeUnload");
      event.preventDefault();
      setTimeout(saveLikes, 1000); // 비동기 저장 지연
    };

    const handleFocus = () => {
      // console.log("Page is focused.");
      saveLikes();
    };

    const handleBlur = () => {
      // console.log("Page is blurred.");
      saveLikes();
    };

    // 필수 이벤트만 등록
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePagehide);
    document.addEventListener("handleFocus", handleFocus);
    window.addEventListener("handleBlur", handleBlur);


    // Cleanup 함수: 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePagehide);
      document.removeEventListener("handleFocus", handleFocus);
      window.removeEventListener("handleBlur", handleBlur);
    };
  }, []); // 빈 의존성 배열: 컴포넌트 마운트/언마운트 시 실행

  // 로컬 스토리지에 데이터 저장
  useEffect(() => {
    if (filteredFlags && filteredFlags.length > 0) {
      localStorage.setItem('flags', JSON.stringify(filteredFlags));
      console.log('Flags saved to local storage');
    }
  }, [filteredFlags]); // filteredFlags가 변경될 때마다 실행

  return (
    <section className="container mx-auto px-1 py-1">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {sortedFlags.map((flag) => (
          <li key={flag.id} className="text-center">
            <LikeableImage flag={flag} />
            {/* 플래그 이름 */}
            <p className="mt-2 text-pretty font-bold">{flag.name}</p>
          </li>
        ))}
      </ul>
      {ENABLE_IMAGE_ALL_DOWN_BUTTON && (
        <div className="mb-4">
          <button
            onClick={downloadAllImages}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Download All Images
          </button>
        </div>
      )}
    </section>
  );
}