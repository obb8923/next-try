"use client";

import { useState, useEffect } from "react";

interface PostIdProps {
  params: {
    id: string;
  };
}

interface Row {
  body: string;
  create_at: string;
  head: string;
  id: number;
  like: number;
  user_id: number;
}

export default function PostId({ params }: PostIdProps) {
  const [data, setData] = useState<Row[]>([]);

  const getContent = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id }),
    };
    const res = await fetch(`/api/post/${params.id}`, options);
    const result = await res.json();
    console.log(result);
    setData(result);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div>
      <p>{data[0]?.head || "제목"}</p>
      <p>{data[0]?.body || "내용"}</p>
    </div>
  );
}
