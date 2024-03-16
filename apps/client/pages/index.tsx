import Link from "next/link";

export default function Web() {
  return (
    <>
      <h1>Client</h1>
      <div>
        <Link href="/admin">To admin</Link>
      </div>
      <div>
        <Link href="/accessories">Accessories</Link>
      </div>
    </>
  );
}
