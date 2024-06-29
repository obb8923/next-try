import DB from "@/app/_lib/DB";
import { QueryError, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

type Req = {
  body: string;
  head: string;
  id: string;
};

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { body, head, id }: Req = req;

    const result = await new Promise((resolve, reject) => {
      const query: string =
        "INSERT INTO posts (body, head, user_id) VALUES (?, ?, ?)";
      DB.query(
        query,
        [body, head, id],
        (error: QueryError | null, result: RowDataPacket[]) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log(result);
    return NextResponse.json(
      { result: result, message: "ok" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
