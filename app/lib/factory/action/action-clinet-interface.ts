export interface ActionClientInterface {

  /**
   * 좋아요 변환 데이터를 데이터베이스에 저장하는 Server Action
   * @param insertData - 클라이언트에서 전달받은 좋아요 변환 데이터 배열
   * Ref
   * * https://nextjs.org/learn/dashboard-app/mutating-data#2-create-a-server-action
   * * https://stackoverflow.com/questions/77093626/vercel-postgres-bulk-insert-building-sql-query-dynamically-from-array
   */
  saveLikeDeltasToDatabase(
    insertData: { flag_id: number; delta_cnt: number }[],
    clientId: string
  ): Promise<void>;

  updateFlag(
    flagId: number,
    formData: FormData,
  ): Promise<void>;
}