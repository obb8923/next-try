"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type formData = {
  head: string;
  body: string;
  id: string;
};
export default function Posting() {
  const [id, setId] = useState<string>();
  const router = useRouter();
  const { register, handleSubmit } = useForm<formData>();
  const onSubmit: SubmitHandler<formData> = async (formData) => {
    const sendData = {
      ...formData,
      id: id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    };

    const res = await fetch("/api/posting", options);
    const data = await res.json();
    if (data.message === "ok") {
      router.push(`/`);
    } else {
      alert("저장하는 중에 문제가 발생하였습니다.");
    }
  };
  useEffect(() => {
    const id: string = sessionStorage.getItem("id") ?? "";
    setId((prev) => id);
  }, []);
  return (
    <>
      <div>
        <form
          className="flex flex-col gap-3 items-center my-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="bg-white w-50screen px-3 py-1.5"
            placeholder="제목"
            type="text"
            {...register("head", { required: "제목이 입력되지 않았습니다." })}
          ></input>
          <input
            className="bg-white min-h-full w-50screen h-96 overflow-clip px-3"
            placeholder="내용"
            type="textfield"
            {...register("body", { required: "내용이 입력되지 않았습니다." })}
          ></input>
          <input type="hidden" {...register("id")} value={id}></input>
          <button
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="submit"
          >
            저장
          </button>
        </form>
      </div>
    </>
  );
}
