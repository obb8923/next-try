import { QueryError, QueryResult } from "mysql2";
import { NextResponse } from "next/server";
import DB from "@/app/_lib/DB";

interface LoginParams {
  id: string;
  password: string;
}

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  const { id, password }: LoginParams = req;
  console.log("qwe");
  console.log(id, password);
  try {
    const query = "select * from users where username=? and password_hash=?;";
    const result = await new Promise((resolve, reject) => {
      DB.query(
        query,
        [id, password],
        (error: QueryError | null, result: QueryResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error: any) {
    console.log(error);
  }
}

// export function GET() {
//   return NextResponse.json({
//     hello: "hello",
//   });
// }
