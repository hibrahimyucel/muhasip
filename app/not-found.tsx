import Link from "next/link";

export default function NotFound() {
  return (
    <div className="justify-self-center rounded-md bg-black p-2 text-center text-red-500">
      <Link href="/">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        Return Home
      </Link>
    </div>
  );
}
