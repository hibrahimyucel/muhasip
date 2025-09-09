import React from "react";
import HomePageCard from "@/components/main/homePageCard";

export default function Home() {
  return (
    <main className="relative flex h-full w-full justify-center overflow-y-scroll">
      <div className="m-2 flex flex-wrap justify-center gap-2">
        <HomePageCard Href="/contactus" Name="Contact Us" Desc="" />
        <HomePageCard Href="/customers" Name="Customers" Desc="" />
        <HomePageCard Href="/users" Name="Users" Desc="" />
      </div>
    </main>
  );
}
