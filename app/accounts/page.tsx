"use client";
import React, { useState } from "react";
import AccountsEdit from "./components/accountsEdit";
import AccountsTable from "./components/accountsTable";

export default function AccountsPage() {
  const [RecordId, setRecordId] = useState(0);

  function EditRecord(value: number = 0) {
    setRecordId(value);
  }
  function AddRecord(value: number = -1) {
    setRecordId(value);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col justify-start">
      <div className="flex h-full flex-col justify-start px-1 sm:justify-center">
        {RecordId ? (
          <AccountsEdit RecordId={RecordId} onAdd={EditRecord} />
        ) : (
          <AccountsTable
            AddRecordFunc={AddRecord}
            EditRecordFunc={EditRecord}
          />
        )}
      </div>
    </div>
  );
}
