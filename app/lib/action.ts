'use server';

import { ActionClientFactory } from "./factory/action/action-client-factory";

const actionClient = ActionClientFactory.getClient();

export async function saveLikeDeltasToDatabase(
  insertData: { flag_id: number; delta_cnt: number }[],
  clientId: string
): Promise<void> {
  actionClient.saveLikeDeltasToDatabase(insertData, clientId)
}