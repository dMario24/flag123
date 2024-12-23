'use client'

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const [placeholder, setPlaceholder] = useState("🔍");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    const useRouterReplacePath = `${pathname}?${params.toString()}`;
    replace(useRouterReplacePath);
  }, 300);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // console.log(`window.innerWidth:${width}`);
      if (width >= 768) {
        setPlaceholder("🔍 검색 or 📤 업로드 이미지 🚩 이름 입력 ✍️");
      } else if (width >= 400) {
        setPlaceholder("🔍 계엄배 🏆천하제일깃발대회");
      } else if (width >= 350) {
        setPlaceholder("🔍 천하제일🏆깃발대회");
      } else {
        setPlaceholder("천하제일깃발대회");
      }
    };

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Input
      placeholder={placeholder}
      className="!placeholder-indigo-400"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}
