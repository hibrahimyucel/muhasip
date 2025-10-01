"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Icons from "./icons";
export default function ApplicationHeader() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return "Loading";
  }
  return (
    <div className="border-bordercolor flex w-full rounded-sm border px-2">
      <div className="content-center px-1">
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
      <div className="grow content-center px-1">
        <div className="font-serif">Muhasip</div>
        <div className="font-serif text-sm">
          {isSignedIn ? user.fullName?.trim() : ""}
        </div>
      </div>
      <div className="content-center">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <div className="bg-diffcolor cursor-pointer rounded-full p-2">
              <Icons icon="LogIn" />
            </div>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
