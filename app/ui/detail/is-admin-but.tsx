"use client"; // 클라이언트 컴포넌트로 선언

import TooltipIcon from "@/app/ui/detail/reusable-tooltip-icon";
import { MdDeleteOutline as Delete } from "react-icons/md";
import React, { useEffect, useState } from "react";

interface IsAdminBtnProps {
  flagId: number;
}

const IsAdminBtn: React.FC<IsAdminBtnProps> = ({ flagId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 인증 상태를 확인하기 위한 API 호출
    const checkAuth = async () => {
      const response = await fetch('/api/auth');
      const data = await response.json();

      // 로그인 여부에 따라 상태 업데이트
      setIsLoggedIn(data.loggedIn);
    };

    checkAuth();
  }, []);

  // 로그인된 사용자만 버튼을 표시
  if (!isLoggedIn) {
    return null;
  }

  return (
    <TooltipIcon tooltip="삭제" link={`/flags/${flagId}/delete`} icon={Delete} iColor="text-red-600" />
  );
};

export default IsAdminBtn;
