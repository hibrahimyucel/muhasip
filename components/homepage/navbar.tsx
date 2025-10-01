"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Icons from "../icons";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return "Loading";
  }
  return (
    <div className="flex h-full rounded-t-sm">
      {/** Logo */}

      <div className="flex h-full grow flex-row p-1">
        <div className="left-0 flex items-center">
          <Link href="/">
            <Image
              src="/logo.jpg"
              width={194}
              height={194}
              alt=""
              priority={false}
              className="h-10 w-10 rounded-md"
            />
          </Link>
        </div>
        <div className="flex h-full flex-col p-0.5">
          <div className="font-serif">Muhasip</div>
          <div className="font-serif text-sm">
            {isSignedIn ? user.fullName?.trim() : ""}
          </div>
        </div>
      </div>
      <div className="right-0 flex justify-center">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <div className="flex cursor-pointer flex-row justify-center p-1">
              <div className="flex h-full w-10 items-center justify-center rounded-full border-2 bg-black text-3xl text-green-400">
                <Icons icon="LogIn" />
              </div>
            </div>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
