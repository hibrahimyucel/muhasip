import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ApplicationHeader() {
  return (
    <div className="border-bordercolor m-0.5 flex rounded-sm border p-0.5">
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
      <div className="flex grow-1 flex-row">
        <div className="border-bordercolor basis-50 border">
          <div className="bg-diffcolor border-bordercolor basis-50 border"></div>
        </div>
        <div className="bg-editbox border-bordercolor basis-60 border"></div>
      </div>
    </div>
  );
}
