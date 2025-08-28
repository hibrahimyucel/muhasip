"use client";
import React, { useState } from "react";
import { getUsers, user } from "@/libClient/users";

export default function NewsPage() {
  const [users, setUsers] = useState([]);
  async function GetUsers() {
    setUsers(await getUsers());
  }
  return (
    <main>
      <div>
        <button
          type="button"
          onClick={GetUsers}
          className="span-4xl bg-amber-300 rounded-2xl p-2"
        >
          get Users
        </button>
      </div>
      <section>
        {users ? (
          <div className="max-w-1/2 m-2 bg-blue-50">
            <h2 className="border-solid border-2">User List</h2>
            {users.map((u: user, index) => {
              return (
                <div key={index} className="p-1 flex justify-between">
                  <span>{u.idusers}</span>
                  <span>{u.fullname}</span>
                  <span>{u.email}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </section>
    </main>
  );
}
