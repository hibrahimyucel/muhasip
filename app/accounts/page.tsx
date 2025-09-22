"use client";
import React, { useState, useEffect } from "react";
import AccountsDBFilter from "./components/accountsDBFilter";
import AccountsFilter from "./components/accountsFilter";
import { accountsData } from "@/lib/orm/table-data";
import AccountsEdit from "./components/accountsEdit";

export default function AccountsPage() {
  const [Accounts, setAccounts] = useState<accountsData[]>([]);
  const [isEditing, setisEditing] = useState(false);
  let RecordId: number = -1;
  function AddRecord() {
    console.log(isEditing);
    if (isEditing) {
      RecordId = -1;
      setisEditing(false);
    } else {
      RecordId = 0;
      setisEditing(true);
    }
  }
  function EditRecord(value: number) {
    RecordId = value;
    setisEditing(true);
  }
  useEffect(() => {}, [Accounts, isEditing]);
  return (
    <div className="flex h-full flex-col justify-start px-1 sm:justify-center">
      {isEditing ? (
        <AccountsEdit RecordId={RecordId} onAdd={AddRecord} />
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
        </>
      )}
    </div>
  );
}
