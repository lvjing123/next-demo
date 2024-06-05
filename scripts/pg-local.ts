'use server'
import { Pool } from 'pg';
import type {
  QueryResult,
  QueryResultRow,
} from '@neondatabase/serverless';

const connectionString = "postgres://postgresUser:postgresPW@127.0.0.1:5432/postgresDB"

const pool = new Pool({
  connectionString,
})

export async function sql<O extends QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: Primitive[]
): Promise<QueryResult<O>> {
  const [query, params] = sqlTemplate(strings, ...values);
  // @ts-ignore
  const res = await pool.query(query, params);
  const { rows } = res
  const result = { rows }
  // @ts-ignore
  return result as Promise<QueryResult<O>>;
}
 
export type Primitive = string | number | boolean | undefined | null;
 
function sqlTemplate(
  strings: TemplateStringsArray,
  ...values: Primitive[]
): [string, Primitive[]] {
  // if (!isTemplateStringsArray(strings) || !Array.isArray(values)) {
  //   throw new Error("It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\n\tExample: sql`SELECT * FROM users`, not sql('SELECT * FROM users')");
  // }
 
  let result = strings[0] ?? '';
 
  for (let i = 1; i < strings.length; i++) {
    result += `$${i}${strings[i] ?? ''}`;
  }
  return [result, values];
}
 
function isTemplateStringsArray(
  strings: unknown,
): strings is TemplateStringsArray {
  return (
    Array.isArray(strings) && 'raw' in strings && Array.isArray(strings.raw)
  );
}