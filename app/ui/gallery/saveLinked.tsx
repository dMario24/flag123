'use client';
import { saveLikeDeltasToDatabase } from "@/app/lib/action";
import { getClientId } from "@/app/lib/getClientId";

export async function saveLinked() {
  const likeDeltas = JSON.parse(localStorage.getItem("like_deltas") || "{}");

  if (Object.keys(likeDeltas).length === 0) {
    console.log("No like deltas to save.");
    return;
  }

  // 데이터 생성
  const insertData = Object.entries(likeDeltas)
    .filter(([, delta_cnt]) => parseInt(delta_cnt as string, 10) !== 0) // delta_cnt가 0이 아닌 항목만 포함
    .map(([flag_id, delta_cnt]) => ({
      flag_id: parseInt(flag_id, 10),
      delta_cnt: parseInt(delta_cnt as string, 10),
    }));

  if (insertData.length === 0) {
    console.log("No valid like deltas to save.");
    return; // 추가 작업 없이 함수 종료
  }

  try {
    const clinet_id = await getClientId();
    // Server Action 호출
    await saveLikeDeltasToDatabase(insertData, clinet_id);
    // 저장 성공 시 로컬스토리지 초기화
    localStorage.removeItem("like_deltas");
  } catch (error) {
    console.error("Failed to save likes on unload:", error);
  }
}
