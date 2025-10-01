import React from "react";
import { TableProps } from "@/lib/orm/table-props";
import { useState, useEffect } from "react";
import { accountsData } from "@/lib/orm/table-data";
import { sqlOperator } from "@/lib/orm/orm-base";
import { Table } from "@/lib/orm/table";
import Icons from "@/components/icons";

export default function AccountsTable() {
  const [accFilters, setaccFilters] = useState<Partial<accountsData>>({});
  const [Accounts, setAccounts] = useState<accountsData[]>([]);
  //const debouncedfullname = useDebounce(accFilters);
  const inf = TableProps.accounts;
  async function getData() {
    const whereProps: {
      terms: Partial<accountsData>;
      condition: sqlOperator;
    }[] = [];
    whereProps.push({
      terms: { id_accounts: 0 },
      condition: ">",
    });
    if (accFilters) {
      if (accFilters.fullname)
        whereProps.push({
          terms: { fullname: accFilters.fullname.trim().concat("%") },
          condition: "LIKE",
        });
      if (accFilters.contactname)
        whereProps.push({
          terms: { contactname: accFilters.contactname.trim().concat("%") },
          condition: "LIKE",
        });
      if (accFilters.city)
        whereProps.push({
          terms: { city: accFilters.city.trim().concat("%") },
          condition: "LIKE",
        });
      if (accFilters.acc_group)
        whereProps.push({
          terms: { acc_group: accFilters.acc_group.trim() },
          condition: "LIKE",
        });
      if (accFilters.is_customer)
        whereProps.push({
          terms: { is_customer: accFilters.is_customer },
          condition: "=",
        });
      if (accFilters.is_member)
        whereProps.push({
          terms: { is_member: accFilters.is_member },
          condition: "=",
        });

      if (accFilters.is_supplier)
        whereProps.push({
          terms: { is_supplier: accFilters.is_supplier },
          condition: "=",
        });
    }
    const value = await Table.accounts.getData(whereProps);
    setAccounts(value);
  }

  function handleSelectGroup(value: string) {
    setaccFilters({
      ...accFilters,
      is_customer: value == "1",
      is_supplier: value == "2",
      is_member: value == "3",
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/** start Database filter */}

      <div className="flex justify-center gap-0.5">
        <div className="bg-editbox border-editboxfocus w-50 rounded-sm px-0.5 py-0.5 sm:w-59.5">
          {inf.fullname.caption}
          <input
            type="text"
            name={inf.fullname.name}
            defaultValue={accFilters.fullname}
            maxLength={100}
            onChange={(e) =>
              setaccFilters({ ...accFilters, fullname: e.target.value })
            }
            placeholder={inf.fullname.caption}
            className="focus:bg-editboxfocus w-49.5 rounded-sm px-1 outline-0 focus:outline-0 sm:w-59"
          />
        </div>
        <div className="bg-editbox border-editboxfocus hidden w-60.5 rounded-sm px-0.5 py-0.5 sm:block">
          {inf.contactname.caption}
          <input
            type="text"
            name={inf.contactname.name}
            defaultValue={accFilters.contactname}
            maxLength={50}
            onChange={(e) =>
              setaccFilters({ ...accFilters, contactname: e.target.value })
            }
            placeholder={inf.contactname.caption}
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
        </div>
        <div className="bg-editbox border-editboxfocus hidden w-60.5 rounded-sm px-0.5 py-0.5 sm:block">
          {inf.city.caption}
          <input
            type="text"
            name={inf.city.name}
            defaultValue={accFilters.city}
            maxLength={20}
            onChange={(e) =>
              setaccFilters({ ...accFilters, city: e.target.value })
            }
            placeholder={inf.city.caption}
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
        </div>
        <div className="bg-editbox border-editboxfocus hidden w-60.5 rounded-sm px-0.5 py-0.5 sm:block">
          {inf.group.caption}
          <input
            list="items"
            name={inf.group.name}
            maxLength={50}
            onChange={(e) =>
              setaccFilters({ ...accFilters, acc_group: e.target.value })
            }
            placeholder={inf.group.caption}
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
          <datalist id="items">
            <option value="123" />
            <option value="124" />
            <option value="135" />
          </datalist>
        </div>

        <div className="bg-editbox border-editboxfocus hidden w-30.5 rounded-sm px-0.5 py-0.5 sm:block">
          {" Hesap Tipi "}
          <select
            id="items1"
            name="tip"
            onChange={(e) => handleSelectGroup(e.target.value)}
            className="focus:bg-editboxfocus w-30 rounded-sm px-1 outline-0 focus:outline-0"
          >
            <option value="0">Hepsi</option>
            <option value="1">Alıcı</option>
            <option value="2">Satıcı</option>
            <option value="3">Personel</option>
          </select>
        </div>

        <div className="hover:bg-editbox bg-editboxfocus border-diffcolor rounded-md border">
          <button
            type="button"
            className="flex h-full w-10 items-center justify-center"
            onClick={getData}
          >
            <Icons icon="List" />
          </button>
        </div>
        <div className="hover:bg-editbox bg-editboxfocus border-diffcolor rounded-md border">
          <button
            type="button"
            className="flex h-full w-10 items-center justify-center"
            //  onClick={() => onAdd()}
          >
            <Icons icon="Add" />
          </button>
        </div>
      </div>
      {/** end Database filter */}
      {/** start Local filter table-header */}

      <div className="flex justify-center gap-1">
        <div className="flex w-65 flex-col rounded-t-md border">
          <button className="right-0 flex h-7 w-65">
            <h2 className="flex w-full justify-center">
              {inf.fullname.caption}
            </h2>
            <div className="right-0 pr-1 text-2xl">
              <Icons icon="List" />
            </div>
          </button>
          <input
            type="text"
            name={inf.fullname.name}
            maxLength={inf.fullname.maxlength}
            className="flex w-full border-t px-1 outline-0"
          />
        </div>
        <div className="hidden w-50 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex h-7 w-50">
            <h2 className="flex w-full justify-center">
              {inf.contactname.caption}
            </h2>
            <div className="right-0 pr-1 text-2xl">
              <Icons icon="List" />
            </div>
          </button>
          <input
            type="text"
            name={inf.contactname.name}
            maxLength={inf.contactname.maxlength}
            className="flex w-full border-t px-1 outline-0"
          />
        </div>
        <div className="hidden w-80 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex h-7 w-80">
            <h2 className="flex w-full justify-center">{inf.adress.caption}</h2>
            <div className="right-0 pr-1 text-2xl">
              <Icons icon="List" />
            </div>
          </button>
          <input
            type="text"
            name={inf.adress.name}
            maxLength={inf.adress.maxlength}
            className="flex w-full border-t px-1 outline-0"
          />
        </div>
        <div className="hidden w-40 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex h-7 w-40">
            <h2 className="flex w-full justify-center">{inf.city.caption}</h2>
            <div className="right-0 pr-1 text-2xl">
              <Icons icon="List" />
            </div>
          </button>
          <input
            type="text"
            name={inf.city.name}
            maxLength={inf.city.maxlength}
            className="flex w-full border-t px-1 outline-0"
          />
        </div>
        <div className="hidden w-65 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex h-7 w-65">
            <h2 className="flex w-full justify-center">{inf.email.caption}</h2>
            <div className="right-0 pr-1 text-2xl">
              <Icons icon="List" />
            </div>
          </button>
          <input
            type="text"
            name={inf.email.name}
            maxLength={inf.email.maxlength}
            className="flex w-full border-t px-1 outline-0"
          />
        </div>
      </div>

      {/** end Local filter */}
      {/** start Table data */}
      <div className="flex justify-center">
        <div className="flex h-[calc(100vh-10.5rem)] flex-col overflow-y-scroll">
          {Accounts.map((data, index) => (
            <div
              key={data.id_accounts.toString()}
              className={`flex gap-0.5 ${index % 2 ? "bg-background" : "bg-diffcolor"} `}
            >
              <div className="flex w-50 justify-start truncate px-1 sm:w-64">
                <p>{data.fullname}</p>
              </div>
              <div className="hidden w-50 justify-start truncate px-1 sm:flex">
                <p>{data.contactname}</p>
              </div>
              <div className="hidden w-78 justify-start truncate px-1 sm:flex">
                <p>{data.adress}</p>
              </div>
              <div className="hidden w-40 justify-start truncate px-1 sm:flex">
                <p>{data.city}</p>
              </div>
              <div className="hidden w-50.5 justify-start truncate px-1 sm:flex">
                <p>{data.email}</p>
              </div>
              <div className="flex w-7 justify-start truncate px-1">
                <button
                  className="cursor-pointer"
                  // onClick={() => EditRecord(data.id_accounts)}
                >
                  <Icons icon="List" />
                </button>
              </div>
              <div className="flex w-7 justify-start truncate px-1">
                <button
                  className="cursor-pointer"
                  // onClick={() => DeleteRecord(data.id_accounts, data.fullname)                      }
                >
                  <Icons icon="DeleteRow" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/** end Table data */}
    </>
  );
}
