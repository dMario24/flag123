import { DbClientFactory } from "./factory/data/db-client-factory";
import { Flag, FlagMeta } from "@/app/lib/definitions";

const dbClient = DbClientFactory.getClient();

export async function fetchFlags(): Promise<Flag[]> {
  return await dbClient.fetchFlags();
}

export async function insertFlag(flag: Omit<Flag, "id" | "like_count">): Promise<Flag> {
  return await dbClient.insertFlag(flag);
}

export async function fetchFlagById(id: string): Promise<FlagMeta> {
  return await dbClient.fetchFlagById(id);
}

export async function fetchFlagsByParentId(parentId: number): Promise<Flag[]> { 
  return await dbClient.fetchFlagsByParentId(parentId);
}

export async function fetchFlagsByNameKeywords(keywords: string[]): Promise<Flag[]> {
  return await dbClient.fetchFlagsByNameKeywords(keywords);
}