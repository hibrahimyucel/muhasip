"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { TableData } from "@/lib/db/db";

export default function DBInformationPage() {
  const [dbtables, setdbtables] = useState<TableData[]>([]);

  async function getTables() {
    const res = await fetch("/api/dbschema", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const response = await res.json();

      setdbtables(response);
    }
  }
  useEffect(() => {
    getTables();
  }, []);
  return (
    <div className="justify-self-center-safe">
      <button
        className="w-full cursor-pointer rounded-sm border bg-blue-100 p-1"
        onClick={getTables}
      >
        Listele
      </button>
      <div className="m-1 flex flex-wrap justify-center gap-1">
        {dbtables.map((t, index) => (
          <div key={index} className="flex flex-wrap justify-center">
            <table key={t.Name} className="table-cell rounded-t-md border-t">
              <thead>
                <tr className="border-b">
                  <th className="p-1">{t.Name}</th>
                </tr>
              </thead>
              <tbody>
                {t.fields?.map((f, index) => (
                  <tr key={index} className="border-r border-b border-l">
                    <td className="px-0.5">{f.Field}</td>
                    <td className="px-0.5">{f.Type}</td>
                    <td className="px-0.5">{f.Key}</td>
                    <td className="px-0.5">{f.Null}</td>
                    <td className="px-0.5">{f.Default}</td>
                    <td className="px-0.5">{f.Extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
