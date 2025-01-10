import { ActionClientInterface } from "./action-clinet-interface";
import { ActionClientPostgresJs } from "./action-client-postgres-js";
import { ActionClientPostgresVercel } from "./action-client-postgres-vercel";

export class ActionClientFactory {
  static getClient(): ActionClientInterface {
    const clientType = process.env.DATABASE_CLIENT;
    if (clientType === "postgres-vercel") {
      return new ActionClientPostgresVercel();
    }
    return new ActionClientPostgresJs();
  }
}
