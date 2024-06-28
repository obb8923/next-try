import DB from "@/app/_lib/DB";
import { QueryError, QueryResult } from "mysql2";
import { NextResponse } from "next/server";
export async function GET() {
  const query: string = "select * from posts";
  const result: QueryResult = await new Promise((resolve, reject) => {
    DB.query(query, [], (error: QueryError | null, result: QueryResult) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

  return NextResponse.json(result);
}
