"use client";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { getCustomers } from "@/libClient/customers";
import CustomersTable from "@/components/customers/customerTable";

export default function CustomersPage() {
  {
    /* init state */
  }
  const [Loading, setLoading] = useState(true);

  const [pname, setPName] = useState("");
  const [pcity, setPCity] = useState("");

  async function getCustomerData() {
    try {
      setCustomers(await getCustomers(pname, pcity));
    } catch {
      setCustomers([]);
    }
  }
  const [Customers, setCustomers] = useState<[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
    getCustomerData();
    setLoading(false);
  }, []);

  if (Loading) return "Loading";

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col justify-start">
      <div className="flex items-center justify-center gap-1 p-3">
        <div>
          Name{" : "}
          <input
            type="text"
            name="dbsname"
            maxLength={45}
            onChange={(e) =>
              setPName(e.target.value ? e.target.value + "%" : "")
            }
            className="w-40 rounded-md border px-0.5"
          />
        </div>
        <div className="hidden sm:block">
          City{" : "}
          <input
            type="text"
            name="dbscity"
            onChange={(e) =>
              setPCity(e.target.value ? e.target.value + "%" : "")
            }
            maxLength={45}
            className="w-40 rounded-md border px-0.5"
          />
        </div>
        <button
          onClick={getCustomerData}
          type="button"
          className="bg-diffcolor rounded-md border p-0.5 text-sm"
        >
          List Customers
        </button>
      </div>
      {Customers ? (
        <div className="flex h-[calc(100vh-8rem)] w-full justify-center-safe">
          <Suspense fallback={<h1>Loading</h1>}>
            <CustomersTable data={Customers} />
          </Suspense>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
