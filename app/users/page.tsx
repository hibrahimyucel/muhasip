"use client";
import React, { useState, useEffect } from "react";
import { UsersData } from "@/lib/orm/table-users";
import { Table } from "@/lib/orm/table";

export default function UsersPage() {
  const [users, setusr] = useState<UsersData[]>([]);

  async function getUsers() {
    const usr = await Table.Users.GetData([
      [{ fullname: "1%", email: "q%" }, "LIKE"],
      [{ fullname: "1%", email: "q%" }, "="],
    ]);

    setusr(usr);
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="p-1">
        <button
          type="button"
          onClick={getUsers}
          className="span-4xl bg-diffcolor w-full rounded-md bg-amber-200 p-1"
        >
          get Users
        </button>

        <table className="border p-1">
          <thead>
            <tr className="text-center">
              <th className="px-0.5">#</th>
              <th className="px-0.5">Name</th>
              <th className="px-0.5">e-Mail</th>
            </tr>
          </thead>

          {users ? (
            <tbody className="text-left">
              {users.map((u: UsersData, index) => {
                return (
                  <tr key={index} className="border-t">
                    <td className="border-r px-0.5">{index + 1}</td>
                    <td className="border-r px-0.5">{u.fullname}</td>
                    <td className="px-0.5">{u.email}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}
