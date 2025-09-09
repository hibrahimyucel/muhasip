import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex-row justify-center bg-black text-3xl text-amber-200 p-1.5 rounded-3xl m-2">
      <div className="flex justify-center w-auto">
        <Link href="/">Anasayfa</Link>
      </div>
      <div className="flex justify-center">
        <SignIn />
      </div>
    </div>
  );
}
