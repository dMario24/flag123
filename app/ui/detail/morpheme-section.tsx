"use client";

import { useState, useEffect } from "react";
import LikeableImage from "@/app/ui/gallery/likeable-image";
import { Flag } from "@/app/lib/definitions";
import Link from "next/link";

interface MorphemeSectionProps {
  parentName: string;
}

export function MorphemeSection({ parentName }: MorphemeSectionProps) {
  const [morphemes, setMorphemes] = useState<string[]>([]);
  const [relatedFlags, setRelatedFlags] = useState<Flag[]>([]);

  useEffect(() => {
    const fetchMorphemes = async () => {
      try {
        const response = await fetch(`/api/morphemes?text=${encodeURIComponent(parentName)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMorphemes(data);
      } catch (error) {
        console.error('Failed to fetch morphemes:', error);
      }
    };

    fetchMorphemes();
  }, [parentName]);

  useEffect(() => {
    // 로컬 스토리지에서 flags 데이터를 가져오기
    const flagsFromStorage = localStorage.getItem('flags');
    if (flagsFromStorage) {
      const allFlags = JSON.parse(flagsFromStorage) as Flag[];
      // Morphemes를 기반으로 필터링
      const filteredFlags = allFlags.filter(flag => 
        morphemes.some(morpheme => flag.name.toLowerCase().includes(morpheme.toLowerCase()))
      );
      setRelatedFlags(filteredFlags);
    }
  }, [morphemes]);

  if (relatedFlags.length === 0) {
    return null; // 또는 로딩/에러 상태를 표시할 수 있음
  }

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">형태소분석</h2>
      <div className="mb-4">
        {morphemes.map((morpheme, index) => (
          <Link 
            key={index} 
            href={`/?query=${encodeURIComponent(morpheme)}`} 
            className="inline-block mr-2 mb-2 py-1 px-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded hover:bg-blue-200 transition-colors duration-200"
          >
            #{morpheme}
          </Link>
        ))}
      </div>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{
          justifyContent: relatedFlags.length < 4 ? "space-evenly" : "stretch",
        }}
      >
        {relatedFlags.map((flag) => (
          <li key={flag.id} className="text-center">
            <LikeableImage flag={flag} />
            <p className="mt-2 text-pretty">{flag.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}