import { Flag, FlagMeta } from "@/app/lib/definitions";

export interface DbClientInterface {
  fetchFlags(): Promise<Flag[]>;
  insertFlag(flag: Omit<Flag, "id" | "like_count">): Promise<Flag>;
  fetchFlagById(id: string): Promise<FlagMeta>;
  fetchFlagsByParentId(parentId: number): Promise<Flag[]>;
  fetchFlagsByNameKeywords(keywords: string[]): Promise<Flag[]>;
}