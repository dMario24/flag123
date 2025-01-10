import { DbClientFactory } from "./factory/data/db-client-factory";
import { Flag, FlagFrom } from "@/app/lib/definitions";

const dbClient = DbClientFactory.getClient();

export async function fetchFlags(): Promise<Flag[]> {
  return await dbClient.fetchFlags();
}

export async function insertFlag(flag: Omit<Flag, "id" | "like_count">): Promise<Flag> {
  return await dbClient.insertFlag(flag);
}

export async function fetchFlagById(id: string): Promise<FlagFrom> {
  return await dbClient.fetchFlagById(id);
}