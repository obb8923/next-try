import { QueryError, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import DB from "@/app/_lib/DB";
import bcrypt from "bcrypt";

interface LoginParams {
  id: string;
  password: string;
}

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  const { id, password }: LoginParams = req;

  try {
    const query = "SELECT * FROM users WHERE username=?;";
    const result = await new Promise<RowDataPacket[]>((resolve, reject) => {
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

    if (result.length > 0) {
      const user = result[0];
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
      // const passwordMatch = await bcrypt.compare(password, user.password_hash);

      // if (passwordMatch) {
      //   return NextResponse.json(
      //     { message: "Login successful" },
      //     { status: 200 }
      //   );
      // } else {
      //   return NextResponse.json(
      //     { error: "Invalid credentials" },
      //     { status: 401 }
      //   );
      // }
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
