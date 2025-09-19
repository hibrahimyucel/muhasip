"use client";
import React, { useState, useEffect } from "react";
import AccountsDBFilter, {
  accountsFilter,
} from "./components/accountsDBFilter";
import { accountsData } from "@/lib/orm/table-data";
import { Table } from "@/lib/orm/table";
export default function AccountsPage() {
  const [Accounts, setAccounts] = useState<accountsData[]>([]);

  async function getUsers() {
    const value = await Table.accounts.GetData([[{ id_accounts: 0 }, ">"]]);
    setAccounts(value);
  }

  const [accFilters, setaccFilters] = useState<accountsFilter>();
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col justify-start">
      <AccountsDBFilter onChange={setaccFilters} />
      <div className="mt-1 flex items-center justify-center">
        <table className="border p-1">
          <caption>Monthly savings</caption>
          <thead>
            <tr className="text-center">
              <th className="px-0.5">#</th>
              <th className="px-0.5">Name</th>
              <th className="px-0.5">e-Mail</th>
            </tr>
          </thead>
          {Accounts ? (
            <tbody className="text-left">
              {Accounts.map((u: accountsData, index) => {
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
