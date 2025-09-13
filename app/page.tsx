"use client";
import { UsersData } from "@/lib/orm/table-users";
import { Table } from "@/lib/orm/table";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setusr] = useState<UsersData[]>([]);

  async function getUsers() {
    const usr = await Table.Users.findAll();
    console.log(usr);
    setusr(usr);
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="font-sans bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%">
      {users.map((value, index) => {
        return (
          <p key={index.toString()} className="border">
            {value.id}
            <span />
            {value.email}
            <span />
            {value.fullname}
            <span />
          </p>
        );
      })}
    </div>
  );
}
