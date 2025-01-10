import postgres from 'postgres'

const POSTGRES_DATABASE_URL: string = process.env.DATABASE_URL_USED_BY_POSTGRES_JS as string;
const sql = postgres(POSTGRES_DATABASE_URL) // https://www.npmjs.com/package/postgres

export default sql
