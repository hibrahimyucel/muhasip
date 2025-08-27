"use client";
import React, { useState } from "react";

import PagePlaceholder from "@/components/page-placeholder";

export default function NewsPage() {
  type user = {
    idusers: number;
    fullname: string;
    email: string;
  };
  const [users, setUsers] = useState([]);
  async function getUsers() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users`,
      postData
    );
    const resp = await res.json();
    let usersp = [];
    if (res.ok) {
      usersp = resp.results;
    }

    setUsers(usersp);
  }

  return (
    <main>
      <div>
        <button
          type="button"
          onClick={getUsers}
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
