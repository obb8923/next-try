import DB from "@/app/_lib/DB";
import { QueryError, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const result = await new Promise((resolve, reject) => {
    const query: string = "";
    DB.query(query, [], (error: QueryError | null, result: RowDataPacket[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  return NextResponse.json(result);
}
