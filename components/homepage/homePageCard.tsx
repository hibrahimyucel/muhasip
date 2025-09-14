"use client";
import React from "react";
import Link from "next/link";

type props = {
  Name: string;
  Desc: string;
  Href: string;
};
export default function HomePageCard({ Name, Desc, Href }: props) {
  return (
    <div className="bg-diffcolor relative max-h-40 w-full rounded-lg border border-slate-200 p-3 pb-6 shadow-sm sm:w-80">
      <Link href={Href}>
        <div className="bg-diffcolor mb-3 flex justify-center">
          <h5 className="text-2xl font-semibold text-slate-800">{Name}</h5>
        </div>
        <div className="mt-5 max-h-40 overflow-y-auto border-t border-slate-100 p-3 text-center [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-slate-100">
          <p className="mb-4 block max-w-lg leading-normal font-light text-slate-600">
            {Desc}
          </p>
        </div>
      </Link>
    </div>
  );
}
