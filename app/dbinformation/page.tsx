"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Query } from "@/lib/orm/orm-base";

export default function DBInformationPage() {
  const [dbtables, setdbtables] = useState<[]>([]);
  /*function TableRow({ param }: { param: string }) {
    return <p> DESCRIBE users</p>;
  }*/
  async function getTables() {
    const t = await Query("SHOW TABLES FROM mmbisdev", []);
    //const t = await Query("select * from users", []);
    setdbtables(t);
    //t.map((e) => tables.push(e));
    console.log(Object.values(t));
  }
  useEffect(() => {
    getTables();
  }, []);
  return (
    <div className="justify-self-center bg-amber-600">
      <button onClick={getTables}>QQQQ</button>
      {dbtables.map((t, index) => (
        <p key={index}>{Object.values(t)}</p>
      ))}
    </div>
  );
}
