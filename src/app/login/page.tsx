"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginCheck = async (id: string, password: string) => {
    console.log(id, password);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    };
    const res = await fetch("/api/login", options);
    const data = res.json();
    console.log(data);
  };

  useEffect(() => {
    const form = document.querySelector("form[name=login]");
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      console.log(id, password);
      loginCheck(id, password);
    };

    form?.addEventListener("submit", handleSubmit);
    return () => {
      form?.removeEventListener("submit", handleSubmit);
    };
  }, []);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.name === "id"
      ? setId((prev) => e.target.value)
      : setPassword((prev) => e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div>logo</div>
      <form name="login" className="flex flex-col">
        <input
          type="text"
          placeholder="id 입력"
          name="id"
          onChange={changeHandler}
        ></input>
        <input
          type="password"
          placeholder="password 입력"
          name="password"
          onChange={changeHandler}
        ></input>
        <input type="submit" name="submit" value="로그인하기"></input>
      </form>
    </div>
  );
}
