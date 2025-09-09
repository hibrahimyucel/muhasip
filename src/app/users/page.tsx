"use client";
import React, { useState } from "react";
import { getUsers, userData } from "@/libClient/users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  async function GetUsers() {
    setUsers(await getUsers());
  }
  return (
    <div className="flex w-full justify-center">
      <div className="p-1">
        <button
          type="button"
          onClick={GetUsers}
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
              {users.map((u: userData, index) => {
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
