import { DbClientInterface } from "./db-clinet-interface";
import { DbClientPostgresJs } from "./db-client-postgres-js";
import { DbClientPostgresVercel } from "./db-client-postgres-vercel";

export class DbClientFactory {
  static getClient(): DbClientInterface {
    const clientType = process.env.DATABASE_CLIENT;
    if (clientType === "postgres-vercel") {
      return new DbClientPostgresVercel();
    }
    return new DbClientPostgresJs();
  }
}
