import { ActionClientInterface } from "./action-clinet-interface";
import { headers } from "next/headers";
import { extractOSType } from './extractOSType';
import { extractBrowserType } from './extractBrowserType';

import { sql } from "@vercel/postgres";
import { z } from 'zod';


const FormSchema = z.object({
  id: z.number(),
  flagMetaName: z.string(),
  flagMetaSource: z.string(),
});

const UpdateFlag = FormSchema.omit({ id: true });

export class ActionClientPostgresVercel implements ActionClientInterface {
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

  async updateFlag(flagId: number, formData: FormData): Promise<void> {
    const validatedFields = UpdateFlag.safeParse({
      flagMetaName: formData.get('flagMetaName'),
      flagMetaSource: formData.get('flagMetaSource'),
    });

    if (!validatedFields.success) {
      throw new Error('Invalid Form Data');
    }

    const { flagMetaName, flagMetaSource } = validatedFields.data;

    try {
      await sql`
        UPDATE flags
        SET name = ${flagMetaName}
        WHERE id = ${flagId}`;
    } catch (error) {
      throw new Error('Database Error: Failed to Update flags.' + error);
    }

    console.log(`Flag ${flagId} updated successfully!`);
    console.log(`New Name: ${flagMetaName}`);
    console.log(`New Source: ${flagMetaSource}`);
    try {
      // Upsert `flag_metadata` table
      await sql`
        INSERT INTO flag_metadata (flag_id, source)
        VALUES (${flagId}, ${flagMetaSource})
        ON CONFLICT (flag_id) DO UPDATE 
        SET source = EXCLUDED.source`;
    } catch (error) {
      throw new Error('Database Error: Failed to Upsert flag_metadata.' + error);
    }
  }
}
