import { NextResponse } from "next/server";
import DB from "@/app/_lib/DB";
export function POST(req: Request) {
  // URL을 파싱하여 id 추출
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const result = new Promise((resolve, reject) => {
    const query: string = "select * from posts where id=?";
    DB.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  return NextResponse.json(result);
}
