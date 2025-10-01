"use client";
import React, { useState, useEffect } from "react";
import { accountsData } from "@/lib/orm/table-data";
import AccountsEdit from "./components/accountsEdit";
import { Table } from "@/lib/orm/table";
import AccountsTable from "./components/accountsTable";

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
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col justify-start">
      <div className="flex h-full flex-col justify-start px-1 sm:justify-center">
        {RecordId ? (
          <AccountsEdit RecordId={RecordId} onAdd={EditRecord} />
        ) : (
          <AccountsTable />
        )}
      </div>
    </div>
  );
}
