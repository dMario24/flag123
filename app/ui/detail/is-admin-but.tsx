"use client"; // 클라이언트 컴포넌트로 선언

import TooltipIcon from "@/app/ui/detail/reusable-tooltip-icon";
import { MdDeleteOutline as Delete } from "react-icons/md";
import { useSession } from "next-auth/react"

interface IsAdminBtnProps {
  flagId: number;
}

const IsAdminBtn: React.FC<IsAdminBtnProps> = ({ flagId }) => {
  const { data: session } = useSession();

  // 로그인된 사용자만 버튼을 표시
  if (session?.user?.name !== "User") {
    return null;
  }

  return (
    <TooltipIcon tooltip="삭제" link={`/flags/${flagId}/detail`} icon={Delete} iColor="text-red-600" />
  );
};

export default IsAdminBtn;
