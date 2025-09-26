import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex-row justify-center gap-3 rounded-3xl">
      <Link href="/">
        <div className="bg-editboxfocus mt-2 mb-2 flex w-full justify-center rounded-md text-3xl">
          Anasayfa
        </div>
      </Link>
      <div className="flex justify-center">
        <SignIn />
      </div>
    </div>
  );
}
