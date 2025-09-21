"use client";
import React, { useState, useEffect } from "react";
import AccountsDBFilter from "./components/accountsDBFilter";
import AccountsFilter from "./components/accountsFilter";
import { accountsData } from "@/lib/orm/table-data";
import AccountsRows from "./components/accountsRows";
import { Table } from "@/lib/orm/table";

export default function AccountsPage() {
  const [Accounts, setAccounts] = useState<accountsData[]>([]);

  useEffect(() => {}, [Accounts]);
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col justify-center bg-amber-200">
      <AccountsDBFilter onChange={setAccounts} />
      <div>
        <AccountsFilter />

        <div className="flex h-[calc(100vh-8rem)] flex-col overflow-y-scroll">
          {Accounts.map((data, index) => (
            <div
              key={data.id_accounts.toString()}
              className={
                index % 2
                  ? "bg-editbox flex w-302 gap-0.5"
                  : "bg-diffcolor flex w-302 gap-0.5"
              }
            >
              <div className="flex w-65 justify-start px-1">
                <p>{data.fullname}</p>
              </div>
              <div className="flex w-50 justify-start px-1">
                <p>{data.contactname}</p>
              </div>
              <div className="flex w-80 justify-start px-1">
                <p>{data.adress}</p>
              </div>
              <div className="flex w-40 justify-start px-1">
                <p>{data.city}</p>
              </div>
              <div className="flex w-65 justify-start px-1">
                <p>{data.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
