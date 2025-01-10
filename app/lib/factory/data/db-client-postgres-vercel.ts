import { DbClientInterface } from "./db-clinet-interface";
import { Flag, FlagFrom } from "@/app/lib/definitions";
import { unstable_cache } from "next/cache";
import { getCacheTimeout } from "@/lib/utils";

import { sql } from "@vercel/postgres";

const CACHE_TIMEOUT = getCacheTimeout();

export class DbClientPostgresVercel implements DbClientInterface {
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
  getDbData = unstable_cache(
    async () => {
      // TODO DISABLE
      // await sql`
      //   UPDATE select_count
      //   SET count = count + 1, last_updated = now()
      //   WHERE id = 1;
      // `;

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
      console.log("✅ Data inserted successfully:", result.rows[0]);

      console.log(
        "revalidatePath allows you to purge cached data on-demand for a specific path."
      );
      // revalidatePath('/')

      return result.rows[0];
    } catch (error) {
      console.error("🎅-Error Inserting Data:", error);
      throw new Error("데이터베이스 삽입 실패");
    }
  }

  async fetchFlagById(id: string) {
    try {
      const data = await sql<FlagFrom>`
    SELECT 
      f.id,
      f.name,
      f.img_url,
      COALESCE(SUM(fl.delta_cnt), 0) AS like_count,
      f.latitude,
      f.longitude
    FROM 
        flags f
    LEFT JOIN 
        flag_like_history fl
    ON 
        f.id = fl.flag_id
    WHERE 
        f.id = ${id}
    GROUP BY 
        f.id
  `;
      return data.rows[0];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to FilteredFlags.");
    }
  }
}
