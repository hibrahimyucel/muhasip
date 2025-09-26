"use client";
import React, { useState, useEffect } from "react";
import AccountsDBFilter from "./components/accountsDBFilter";
import AccountsFilter from "./components/accountsFilter";
import { accountsData } from "@/lib/orm/table-data";
import AccountsEdit from "./components/accountsEdit";
import Icons, { Ico } from "@/components/icons";
import { Table } from "@/lib/orm/table";

export default function AccountsPage() {
  const [Accounts, setAccounts] = useState<accountsData[]>([]);
  const [RecordId, setRecordId] = useState(0);

  function EditRecord(value: number = 0) {
    setRecordId(value);
  }
  function AddRecord(value: number = -1) {
    setRecordId(value);
  }
  function DeleteRecord(id: number, fullname: string) {
    const result = confirm(`${fullname} 
      adlı hesabı silmek istiyor musunuz.`);
    Table.accounts.delete(id);
  }
  useEffect(() => {}, []);
  return (
    <div className="flex h-full flex-col justify-start px-1 sm:justify-center">
      {RecordId ? (
        <AccountsEdit RecordId={RecordId} onAdd={EditRecord} />
      ) : (
        <>
          <AccountsDBFilter onChange={setAccounts} onAdd={AddRecord} />
          <AccountsFilter />
          <div className="flex h-[calc(100vh-10.5rem)] flex-col overflow-y-scroll">
            {Accounts.map((data, index) => (
              <div
                key={data.id_accounts.toString()}
                className={
                  index % 2
                    ? "bg-editbox flex w-302 gap-0.5"
                    : "bg-diffcolor flex w-302 gap-0.5"
                }
              >
                <div className="flex w-65 justify-start truncate px-1">
                  <p>{data.fullname}</p>
                </div>
                <div className="flex w-50 justify-start truncate px-1">
                  <p>{data.contactname}</p>
                </div>
                <div className="flex w-80 justify-start truncate px-1">
                  <p>{data.adress}</p>
                </div>
                <div className="flex w-40 justify-start truncate px-1">
                  <p>{data.city}</p>
                </div>
                <div className="flex w-50.5 justify-start truncate px-1">
                  <p>{data.email}</p>
                </div>
                <div className="flex w-7 justify-start truncate px-1">
                  <button
                    className="cursor-pointer"
                    onClick={() => EditRecord(data.id_accounts)}
                  >
                    <Icons icon={Ico.icoList} />
                  </button>
                </div>
                <div className="flex w-7 justify-start truncate px-1">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      DeleteRecord(data.id_accounts, data.fullname)
                    }
                  >
                    <Icons icon={Ico.icoDeleteRow} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
