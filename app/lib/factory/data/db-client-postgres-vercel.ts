import * as dbClinetInterface from "./db-clinet-interface";
import { Flag, FlagMeta } from "@/app/lib/definitions";
import { unstable_cache } from "next/cache";
import { getCacheTimeout } from "@/lib/utils";
import { sql } from "@vercel/postgres";

const CACHE_TIMEOUT = getCacheTimeout();

export class DbClientPostgresVercel implements dbClinetInterface.DbClientInterface {
  async fetchFlagsByNameKeywords(keywords: string[]): Promise<Flag[]> {
    if (keywords.length === 0) {
      return [];  // Return empty array if no keywords
    }

    // keywords 배열을 기반으로 LIKE 조건 생성
    const conditions = keywords.map((keyword) => sql`f.name LIKE ${'%' + keyword + '%'}`);

    // 조건을 OR로 결합
    const combinedConditions = conditions.reduce((acc, condition, index) => {
      return index === 0 ? `${condition}` : `${acc} OR ${condition}`;
    }, '').replace(/\n/g, ' '); // SQL에서 줄바꿈 제거

    // SQL 쿼리 실행
    const data = await sql<Flag>`
    SELECT 
      f.id,
      f.name,
      f.img_url,
      COALESCE(SUM(fl.delta_cnt), 0) AS like_count
    FROM 
      flags f
    LEFT JOIN 
      flag_like_history fl
    ON 
      f.id = fl.flag_id
    WHERE 
      ${combinedConditions}  -- 동적으로 생성된 조건
    GROUP BY 
      f.id, f.name, f.img_url
    ORDER BY 
    COALESCE(SUM(fl.delta_cnt), 0) DESC`;

    return data.rows; // 결과 반환
  }

  async fetchFlagsByParentId(parentId: number): Promise<Flag[]> {
    const data = await sql<Flag>`
      SELECT 
        f.id,
        f.name,
        f.img_url,
        COALESCE(SUM(fl.delta_cnt), 0) AS like_count
      FROM 
        flags f
      LEFT JOIN 
        flag_like_history fl
      ON 
        f.id = fl.flag_id
      WHERE 
        f.parent_id = ${parentId}
      GROUP BY 
        f.id, f.name, f.img_url
      ORDER BY 
        f.id DESC`;

    return data.rows;
  }

  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
  getDbData = unstable_cache(
    async () => {
      const data = await sql<Flag>`
      SELECT 
        f.id,
        f.name,
        f.img_url,
        COALESCE(SUM(fl.delta_cnt), 0) AS like_count
      FROM 
          flags f
      LEFT JOIN 
          flag_like_history fl
      ON 
          f.id = fl.flag_id
      GROUP BY 
          f.id, f.name, f.img_url
      ORDER BY 
          f.id DESC
      `;
      return data.rows;
    },
    ["msi"], // 캐시 키에 query 포함
    {
      revalidate: CACHE_TIMEOUT,
      tags: ["ism"],
    }
  );

  async fetchFlags(): Promise<Flag[]> {
    try {
      // 데이터를 캐싱하며 ISR (Incremental Static Regeneration) 사용
      // const flags = await getFlagsFromDb();
      const flags = await this.getDbData();
      return flags;
    } catch (dbError) {
      console.error("🎅-dbError Try Fallback", dbError);
      throw new Error("데이터베이스 조회 실패");
    }
  }

  /**
   * 깃발 데이터를 데이터베이스에 삽입하는 함수
   * @param flag - 삽입할 깃발 데이터 (id 제외, 자동 생성)
   * @returns 삽입된 깃발 데이터
   */
  async insertFlag(flag: Omit<Flag, "id" | "like_count">): Promise<Flag> {
    try {
      const result = await sql<Flag>`
      INSERT INTO flags(name, img_url, latitude, longitude)
      VALUES(
    ${flag.name},
    ${flag.img_url},
    37.525307 + (37.530139 - 37.525307) * RANDOM(),
    126.919467 + (126.922896 - 126.919467) * RANDOM()
  )
      RETURNING id, name, img_url
  `;
      // console.log("✅ Data inserted successfully:", result.rows[0]);
      // console.log("revalidatePath allows you to purge cached data on-demand for a specific path.");
      // revalidatePath('/')

      return result.rows[0];
    } catch (error) {
      console.error("🎅-Error Inserting Data:", error);
      throw new Error("데이터베이스 삽입 실패");
    }
  }

  async fetchFlagById(id: string) {
    try {
      const data = await sql<FlagMeta>`
      SELECT 
        f.id,
        f.name,
        f.img_url,
        COALESCE(SUM(fl.delta_cnt), 0) AS like_count,
        f.latitude,
        f.longitude,
        -- COALESCE(fm.source, '🐟') AS source
        fm.source
      FROM 
        flags f
      LEFT JOIN 
        flag_like_history fl
      ON 
        f.id = fl.flag_id
      LEFT JOIN
        flag_metadata fm
      ON 
        f.id = fm.flag_id
      WHERE 
        f.id = ${id}
      GROUP BY 
        f.id, fm.source`;
      return data.rows[0];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to FilteredFlags.");
    }
  }
}