"use client";
import { useState, ChangeEvent, useEffect } from "react";
import Icons from "@/libClient/icons";
import {
  TCustomer,
  TCustomerField,
  TCustomerFilter,
  TCustomerSort,
} from "@/libClient/customers";
import { orderStr } from "@/libClient/utils";
import CustomerEdit from "./customerEdit";
import CustomerRow from "./customerRow";

export default function CustomersTable({ data }: { data: [] }) {
  // filter

  const [filterValue, setFilterValue] = useState<TCustomerFilter>({
    value: "",
    field: "name",
  });

  const filteredValues = data.filter((v: TCustomer) =>
    v[filterValue.field].toLowerCase().includes(filterValue.value),
  );

  function RequestFilter(keyValue: TCustomerField, fValue: string) {
    setFilterValue({
      field: keyValue,
      value: fValue.toLocaleLowerCase(),
    });
    return 0;
  }

  // sort
  const [sortConfig, setSortConfig] = useState<TCustomerSort>({
    field: "name",
    ascending: true,
  });

  {
    filteredValues.sort((a: TCustomer, b: TCustomer) => {
      return orderStr(
        a[sortConfig.field].toLowerCase(),
        b[sortConfig.field].toLowerCase(),
        sortConfig.ascending,
      );
    });
  }

  function RequestSort(v: TCustomerField) {
    if (v !== sortConfig.field) {
      setSortConfig((prev: TCustomerSort) => ({
        ...prev,
        field: v,
      }));
    } else {
      setSortConfig((prev: TCustomerSort) => ({
        ...prev,
        ascending: !prev.ascending,
      }));
    }
  }

  const [isEditExpanded, setIsEditExpanded] = useState(false);

  function getNew() {
    const c: TCustomer = {
      idcustomers: 0,
      name: "",
      adress: "",
      city: "",
      phone: "",
    };
    return c;
  }
  return (
    <>
      <div className="mt-1 flex h-full flex-col justify-center">
        {/** table header - edit page*/}

        {/** table header */}
        <div className="flex flex-row gap-0.5">
          <div className="flex h-full w-10 max-w-10 justify-end rounded-md border py-1 pr-0.5 text-ellipsis"></div>
          {/** table header : name */}
          <div className="flex w-65 flex-col rounded-t-md border">
            <button
              className="right-0 flex h-7 w-65"
              onClick={() => RequestSort("name")}
            >
              <h2 className="flex w-full justify-center">Customer Name</h2>
              <div className="right-0 pr-1 text-2xl">
                <Icons
                  icon={
                    sortConfig.field == "name"
                      ? sortConfig.ascending
                        ? "icoSortA"
                        : "icoSortD"
                      : "icoList"
                  }
                />
              </div>
            </button>
            <input
              type="text"
              name="lfname"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                RequestFilter("name", e.target.value)
              }
              defaultValue={
                filterValue.field === "name" ? filterValue.value : ""
              }
              className="flex w-full border-t px-1"
            />
          </div>
          {/** table header : city */}
          <div
            className="hidden w-40 flex-col rounded-t-md border sm:flex"
            onClick={() => RequestSort("city")}
          >
            <button className="right-0 flex h-7 w-40">
              <h2 className="flex w-full justify-center">City</h2>
              <div className="right-0 pr-1 text-2xl">
                <Icons
                  icon={
                    sortConfig.field == "city"
                      ? sortConfig.ascending
                        ? "icoSortA"
                        : "icoSortD"
                      : "icoList"
                  }
                />
              </div>
            </button>
            <input
              type="text"
              name="lfcity"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                RequestFilter("city", e.target.value)
              }
              defaultValue={
                filterValue.field === "city" ? filterValue.value : ""
              }
              className="flex w-full border-t px-1"
            />
          </div>
          {/** table header : empty ... */}
          <div className="hidden w-40 flex-col rounded-t-md border sm:flex">
            <button className="right-0 flex h-7 w-40">
              <h2 className="flex w-full justify-center">...</h2>
              <div className="right-0 pr-1 text-2xl">
                <Icons icon="icoCircle" />
              </div>
            </button>
          </div>
          {/** table header : phone */}
          <div className="hidden w-40 flex-col rounded-t-md border sm:flex">
            <button className="right-0 flex h-7 w-40">
              <h2 className="flex w-full justify-center">Phone</h2>
              <div className="right-0 pr-1 text-2xl">
                <Icons icon="icoCircle" />
              </div>
            </button>
          </div>
          {/** table header : adress */}
          <div className="hidden w-80 flex-col rounded-t-md border sm:flex">
            <button className="right-0 flex h-7 w-80">
              <h2 className="flex w-full justify-center">Adress</h2>
              <div className="right-0 pr-1 text-2xl">
                <Icons icon="icoCircle" />
              </div>
            </button>
          </div>
          {/** table header : new record */}
          <div className="flex w-8 items-center rounded-t-md border">
            <button
              className="flex h-full w-8 items-center justify-center text-2xl"
              onClick={() => setIsEditExpanded(!isEditExpanded)}
            >
              <Icons icon="icoAdd"></Icons>
            </button>
          </div>
          {/** table header : end          */}
        </div>
        {/** edit page for new record*/}

        {isEditExpanded ? (
          <CustomerEdit
            isOpenFunc={() => setIsEditExpanded(false)}
            customer={getNew()}
          />
        ) : (
          ""
        )}

        {/** edit page for new record*/}

        <div className="mt-1 flex h-[calc(100vh-8rem)] flex-col justify-start overflow-y-scroll">
          {filteredValues.map((v: TCustomer, index) => (
            <CustomerRow key={index} Customer={v} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
