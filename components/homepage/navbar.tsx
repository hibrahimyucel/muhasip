"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {  SignInButton, UserButton } from "@clerk/nextjs";
import Icons from "../icons";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-full w-full rounded-t-sm">
      {/** Logo */}
      <Link href="/">
        <div className="flex h-full flex-row justify-center p-1">
          <div className="left-0 flex items-center">
            <Image
              src="/logo.jpg"
              width={194}
              height={194}
              alt=""
              priority={false}
              className="h-10 w-10 rounded-md"
            />
          </div>
          <div className="flex h-full flex-col justify-center p-0.5">
            <div className="font-serif text-slate-600">Muhasip</div>
            <div className="font-serif text-sm text-slate-600">
              {isSignedIn ? user.fullName : ""}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex grow"></div>

      {isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton>
          <div className="flex cursor-pointer flex-row justify-center p-1">
            <div className="right-0 flex h-full w-10 items-center justify-center rounded-full border-2 bg-black text-3xl text-green-400">
              <Icons icon="icoLogIn" />
            </div>
          </div>
        </SignInButton>
      )}
    </div>
  );
}
