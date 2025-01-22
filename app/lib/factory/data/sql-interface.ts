import { QueryResult, QueryResultRow } from "pg";

export type Primitive = string | number | boolean | undefined | null;

export interface SqlInterface {
  <O extends QueryResultRow>(
    strings: TemplateStringsArray,
    ...values: (Primitive | never)[]
  ): Promise<QueryResult<O>>;
}
