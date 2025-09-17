"use client";
import React, { useState } from "react";
import AccountsDBFilter, {
  accountsFilter,
} from "./components/accountsDBFilter";
export default function AccountsPage() {
  const [accFilters, setaccFilters] = useState<accountsFilter>();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col justify-start">
      <div className="flex items-center justify-center gap-1 p-3">
        <div>{accFilters ? accFilters.fullname : ""}</div>
        <AccountsDBFilter onChange={setaccFilters} />
      </div>
    </div>
  );
}
