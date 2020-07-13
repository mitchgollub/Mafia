import mysql from 'serverless-mysql';
import { QueryError, RowDataPacket } from 'mysql';
import { SQLStatement } from 'sql-template-strings';

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  onConnectError: (e: QueryError) => {
    console.error(`MySQL Connection Error: ${e.code}`);
  },
  onError: (e: QueryError) => {
    console.error(`MySQL Error: ${e.code}`);
  },
});

export async function query(query: SQLStatement): Promise<RowDataPacket[]> {
  const results: RowDataPacket[] | MySQLError = await db.query(query);
  await db.end();

  if ((results as MySQLError).error) {
    throw new Error(results.toString());
  }

  return results as RowDataPacket[];
}

interface MySQLError {
  error: string;
}
