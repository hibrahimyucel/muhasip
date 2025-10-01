"use client";
import React, { useState, useEffect } from "react";
import { Table } from "@/lib/orm/table";
import { usersData } from "@/lib/orm/table-data";

export default function UsersPage() {
  const [users, setusers] = useState<usersData[]>([]);

  async function getUsers() {
    const usr = await Table.users.getData([
      { terms: { id_users: 0 }, condition: ">" },
    ]);
    setusers(usr);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="p-1">
          <button
            type="button"
            onClick={getUsers}
            className="span-4xl bg-diffcolor w-full rounded-md p-1"
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
                {users.map((u: usersData, index) => {
                  return (
                    <tr key={index} className="border-t">
                      <td className="border-r px-0.5">{index + 1}</td>
                      <td className="border-r px-0.5">{u.fullname}</td>
                      <td className="px-0.5">{u.idClerk}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
    </>
  );
}
