"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
export default function Table() {
  interface table {
    body: string;
    create_at: string;
    head: string;
    id: number;
    like: number;
    user_id: number;
  }
  const [data, setData] = useState<table[]>([]);
  const getDB = async () => {
    const res = await fetch("/api/table");
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getDB();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>글 제목</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <Link href={`/post/${row.id}`}>{row.head}</Link>
              </td>
              <td>
                <Link href={`/user/${row.user_id}`}></Link>
                {row.user_id}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
