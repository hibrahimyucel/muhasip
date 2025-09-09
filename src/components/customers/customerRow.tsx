import { TCustomer } from "@/libClient/customers";
import Icons from "@/libClient/icons";
import React, { useEffect, useState } from "react";
import CustomerEdit from "./customerEdit";

export default function CustomerRow({
  Customer,
  index,
}: {
  Customer: TCustomer;
  index: number;
}) {
  const [isEditExpandedRow, setIsEditExpandedRow] = useState(false);

  useEffect(() => {
    /* console.log(Customer?.name + isEditExpandedRow);*/
  }, []);
  return (
    <div>
      <div
        className={
          index % 2 ? "gap-0.4 flex border" : "gap-0.4 bg-diffcolor flex border"
        }
      >
        <div className="flex w-10 justify-end border-r px-1">{index + 1}</div>
        <div className="flex w-65 justify-start px-2">
          <p>{Customer.name}</p>
        </div>
        <div className="hidden w-40 justify-start px-2 sm:flex">
          <p>{Customer.city}</p>
        </div>
        <div className="hidden w-40 justify-start px-2 sm:flex">
          <p>....</p>
        </div>
        <div className="hidden w-40 justify-start px-2 text-ellipsis sm:flex">
          <p>{Customer.phone}</p>
        </div>

        <div className="hidden w-80 justify-start px-2 sm:flex">
          <p>{Customer.adress}</p>
        </div>
        <div className="flex flex-row gap-0.5">
          <button
            id="editrow"
            onClick={() => setIsEditExpandedRow(!isEditExpandedRow)}
            className="flex w-8 items-center justify-center text-2xl"
          >
            <Icons icon="icoList" />
          </button>
        </div>
      </div>
      <div>
        {isEditExpandedRow ? (
          <CustomerEdit
            isOpenFunc={() => setIsEditExpandedRow(false)}
            customer={Customer}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
