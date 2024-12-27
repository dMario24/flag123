'use server';

import { sql } from "@vercel/postgres";
import { headers } from "next/headers";

/**
 * 좋아요 변환 데이터를 데이터베이스에 저장하는 Server Action
 * @param insertData - 클라이언트에서 전달받은 좋아요 변환 데이터 배열
 * Ref
 * * https://nextjs.org/learn/dashboard-app/mutating-data#2-create-a-server-action
 * * https://stackoverflow.com/questions/77093626/vercel-postgres-bulk-insert-building-sql-query-dynamically-from-array
 */
export async function saveLikeDeltasToDatabase(
  insertData: { flag_id: number; delta_cnt: number }[],
  clientId: string
): Promise<void> {

  if (insertData.length === 0) {
    console.log("No like deltas to save.");
    return;
  }

  try {
    // Extract headers
    const headerMap = headers();
    const client_id = clientId;
    const userAgent = headerMap.get("user-agent") || "unknown";
    const languageCode = headerMap.get("accept-language")?.split(",")[0] || "na";

    // Determine device, OS, and browser types
    const deviceType = userAgent.includes("Mobile") ? "mobile" : "desktop";
    const osType = extractOSType(userAgent);
    const browserType = extractBrowserType(userAgent);

    // Check if client_id exists or insert it
    const clientResult = await sql.query(
      `
      INSERT INTO clients (client_id, device_type, os_type, browser_type, language_code)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (client_id) DO UPDATE
      SET 
        device_type = EXCLUDED.device_type,
        os_type = EXCLUDED.os_type,
        browser_type = EXCLUDED.browser_type,
        language_code = EXCLUDED.language_code
      RETURNING id
      `,
      [client_id, deviceType, osType, browserType, languageCode]
    );

    const clientRef =
      clientResult.rows.length > 0
        ? clientResult.rows[0].id // Newly inserted client
        : (
          await sql.query(
            `SELECT id FROM clients WHERE client_id = $1`,
            [clientId]
          )
        ).rows[0].id; // Existing client


    // JSON 데이터를 json_populate_recordset으로 변환하여 삽입
    await sql.query(
      `INSERT INTO flag_like_history (flag_id, delta_cnt, client_ref)
       SELECT flag_id, delta_cnt, $2
       FROM json_populate_recordset(NULL::flag_like_history, $1)`,
      [JSON.stringify(insertData), clientRef]
    );

    console.log("Like deltas saved successfully!");
  } catch (error) {
    console.error("Failed to save like deltas:", error);
  }
}

/**
 * Extract OS type from User-Agent header
 * @param userAgent - User-Agent string
 */
function extractOSType(userAgent: string): string {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "MacOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  return "unknown";
}

/**
 * Extract Browser type from User-Agent header
 * @param userAgent - User-Agent string
 */
function extractBrowserType(userAgent: string): string {

  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Whale")) return "Whale";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera")) return "Opera";
  if (userAgent.includes("Chrome")) return "Chrome";
  return "unknown";
}