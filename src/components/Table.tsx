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
    <div className="flex flex-col mx-10 my-10">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="bg-white min-w-full text-left text-sm font-light text-surface dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    id
                  </th>
                  <th scope="col" className="px-6 py-4">
                    글 제목
                  </th>
                  <th scope="col" className="px-6 py-4">
                    작성자
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {row.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link href={`/post/${row.id}`}>{row.head}</Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link href={`/user/${row.user_id}`}></Link>
                        {row.user_id}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
