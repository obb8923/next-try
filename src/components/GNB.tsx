import Link from "next/link";
export default function GNB() {
  return (
    <nav className=" flex p-8 gap-10 shadow">
      <Link href="/">logo</Link>
      <Link href="/login">로그인</Link>
    </nav>
  );
}
