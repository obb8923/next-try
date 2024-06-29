import { NextResponse } from "next/server";
import DB from "@/app/_lib/DB";
import { QueryError, RowDataPacket } from "mysql2";
export async function POST(req: Request) {
  // URL을 파싱하여 id 추출
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const result = await new Promise((resolve, reject) => {
    const query: string = "select * from posts where id=?";
    DB.query(
      query,
      [id],
      (error: QueryError | null, result: RowDataPacket[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
  return NextResponse.json(result);
}
