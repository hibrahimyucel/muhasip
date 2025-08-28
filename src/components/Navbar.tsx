"use client";
import { LogoLink, UserLink } from "./LogoLink";

export default function Navbar() {
  return (
    <div className="grid grid-cols-2 border-b-2">
      <div className="relative p-1 sm:flex flex-col justify-center">
        <LogoLink />
      </div>
      <div className="absolute right-0 p-1 sm:flex flex-col justify-center">
        <UserLink />
      </div>
    </div>
  );
}
