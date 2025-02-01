import { DbClientInterface } from "./db-clinet-interface";
import { DbClientPostgresImpl } from "./db-client-postgres-impl";
import { Primitive, SqlInterface } from "@/app/lib/factory/data/sql-interface";
import { FieldDef, sql as vercelSql } from "@vercel/postgres";
import { QueryResult, QueryResultRow } from "pg";
import { default as localSql } from "@/app/lib/postgresjs";

export class DbClientFactory {
  static getClient(): DbClientInterface {
    const clientType = process.env.DATABASE_CLIENT;
    if (clientType === "postgres-vercel") {
      return new DbClientPostgresImpl(sqlVercel);
    }
    return new DbClientPostgresImpl(sqlLocal);
  }
}

const sqlVercel: SqlInterface = async <O extends QueryResultRow>(strings: TemplateStringsArray, ...values: (Primitive | never)[]): Promise<QueryResult<O>> => {
  return await vercelSql<O>(strings, ...values);
}

const sqlLocal: SqlInterface = async <O extends QueryResultRow>(strings: TemplateStringsArray, ...values: (Primitive | never)[]): Promise<QueryResult<O>> => {

  // eslint-disable-next-line
  // @ts-ignore
  const rows = await localSql(strings, ...values);
  return {
    // eslint-disable-next-line
    // @ts-ignore
    rows: rows,
    rowCount: rows.length,
    command: determineCommand(strings),
    oid: 0,
    fields: extractFields(strings),
  };
};

/**
 * Helper function to determine the SQL command from the query.
 * This is a simplistic implementation and might need enhancements.
 */
function determineCommand(strings: TemplateStringsArray): string {
  const fullQuery = strings.reduce((acc, str) => acc + str, "").trim();
  const commandMatch = fullQuery.match(/^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s/i);
  return commandMatch ? commandMatch[1].toUpperCase() : "UNKNOWN";
}

/**
 * Helper function to extract field metadata.
 * The 'postgres' package does not provide field metadata, so we return null.
 * Alternatively, you can parse the query to extract field names.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractFields<O extends QueryResultRow>(strings: TemplateStringsArray): FieldDef[] {
  // Returning empty as 'postgres' does not provide field metadata
  // You can implement parsing logic here if field metadata is essential
  return [];
}
