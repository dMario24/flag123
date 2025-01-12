import { ActionClientInterface } from './action-clinet-interface'
import { headers } from "next/headers";
import { extractOSType } from './extractOSType';
import { extractBrowserType } from './extractBrowserType';

import sql from "@/app/lib/postgresjs";

export class ActionClientPostgresJs implements ActionClientInterface {
  
  async saveLikeDeltasToDatabase(insertData: { flag_id: number; delta_cnt: number; }[], clientId: string): Promise<void> {
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
      const clientResult = await sql`
        INSERT INTO clients (client_id, device_type, os_type, browser_type, language_code)
        VALUES (${client_id}, ${deviceType}, ${osType}, ${browserType}, ${languageCode})
        ON CONFLICT (client_id) DO UPDATE
        SET 
          device_type = EXCLUDED.device_type,
          os_type = EXCLUDED.os_type,
          browser_type = EXCLUDED.browser_type,
          language_code = EXCLUDED.language_code
        RETURNING id
        `;
  
      const clientRef = clientResult[0]?.id || (
        await sql`SELECT id FROM clients WHERE client_id = ${client_id}`
      )[0]?.id;
  
      if (!clientRef) {
        throw new Error('Failed to retrieve or insert client reference.');
      }
  
      // JSON 데이터를 json_populate_recordset으로 변환하여 삽입
      await sql`
      INSERT INTO flag_like_history (flag_id, delta_cnt, client_ref)
      SELECT flag_id, delta_cnt, ${clientRef}
      FROM json_populate_recordset(NULL::flag_like_history, ${sql.json(insertData)}::json)`;
  
      console.log("Like deltas saved successfully!");
    } catch (error) {
      console.error("Failed to save like deltas:", error);
    }
  }

  async updateFlag(flagId: number, formData: FormData): Promise<void> {
    throw new Error('Method not implemented.' + flagId + formData);
  }
}
