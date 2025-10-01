import React from "react";
import { TableProps } from "@/lib/orm/table-props";
import { useState, useEffect } from "react";
import { accountsData } from "@/lib/orm/table-data";
import { sqlOperator } from "@/lib/orm/orm-base";
import { Table } from "@/lib/orm/table";
import Icons from "@/components/icons";

type AccountsProps = {
  EditRecordFunc: (id: number) => void;
  AddRecordFunc: () => void;
};
export default function AccountsTable({
  AddRecordFunc,
  EditRecordFunc,
}: AccountsProps) {
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

  function handleSelectAccType(value: string) {
    setaccFilters({
      ...accFilters,
      is_customer: value == "1",
      is_supplier: value == "2",
      is_member: value == "3",
    });
  }
  function deleteRecord(id: number, fullname: string) {
    const result = confirm(`${fullname} 
      adlı hesabı silmek istiyor musunuz.`);
    if (result)
      try {
        Table.accounts.delete(id);
        getData();
      } catch {
        return;
      }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/** start Database filter */}
      <header className="bg-diffcolor flex w-full gap-1 p-1">
        <div className="ml-1 flex grow-1 basis-50 flex-col">
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
            className="focus:bg-editboxfocus w-full rounded-sm outline-0 focus:outline-0"
          />
        </div>
        <div className="hidden grow-1 basis-50 flex-col sm:block">
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
            className="focus:bg-editboxfocus w-full rounded-sm outline-0 focus:outline-0"
          />
        </div>
        <div className="hidden grow-1 basis-50 flex-col sm:block">
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
            className="focus:bg-editboxfocus w-full rounded-sm outline-0 focus:outline-0"
          />
        </div>
        <div className="hidden grow-1 basis-50 flex-col sm:block">
          {inf.group.caption}
          <input
            list="items"
            name={inf.group.name}
            maxLength={50}
            onChange={(e) =>
              setaccFilters({ ...accFilters, acc_group: e.target.value })
            }
            placeholder={inf.group.caption}
            className="focus:bg-editboxfocus w-full rounded-sm outline-0 focus:outline-0"
          />
          <datalist id="items">
            <option value="123" />
            <option value="124" />
            <option value="135" />
          </datalist>
        </div>

        <div className="hover:bg-editboxfocus hidden grow-1 basis-50 flex-col sm:block">
          {" Hesap Tipi "}
          <select
            id="items1"
            name="tip"
            onChange={(e) => handleSelectAccType(e.target.value)}
            className="focus:bg-editboxfocus w-full rounded-sm outline-0 focus:outline-0"
          >
            <option value="0">Hepsi</option>
            <option value="1">Alıcı</option>
            <option value="2">Satıcı</option>
            <option value="3">Personel</option>
          </select>
        </div>

        <div className="hover:bg-editboxfocus shrink-0 grow-0 cursor-pointer justify-center rounded-md p-1">
          <button
            type="button"
            className="h-full place-self-center"
            onClick={getData}
          >
            <Icons icon="List" />
          </button>
        </div>
        <div className="hover:bg-editboxfocus shrink-0 grow-0 cursor-pointer justify-center rounded-md p-1">
          <button
            type="button"
            className="h-full place-self-center"
            onClick={() => AddRecordFunc()}
          >
            <Icons icon="Add" />
          </button>
        </div>
      </header>
      {/** end Database filter */}
      {/** start Local filter table-header */}

      <section className="flex w-full">
        <div className="flex grow basis-50 flex-col rounded-t-md border">
          <button className="right-0 flex">
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
        <div className="hidden grow basis-50 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex">
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
        <div className="hidden grow basis-50 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex">
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
        <div className="hidden grow basis-50 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex">
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
        <div className="hidden grow basis-50 flex-col rounded-t-md border sm:flex">
          <button className="right-0 flex">
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
        <div className="flex w-17 shrink-0 grow-0 flex-col rounded-t-md"></div>
      </section>

      {/** end Local filter */}
      {/** start Table data */}

      <div className="flex w-full grow flex-col overflow-y-scroll border pr-1">
        {Accounts.map((data, index) => (
          <div
            key={data.id_accounts.toString()}
            className={`flex ${index % 2 ? "bg-background" : "bg-diffcolor"} `}
          >
            <div className="flex grow basis-50 overflow-hidden px-1 text-nowrap text-clip">
              {data.fullname}
            </div>
            <div className="hidden grow basis-50 overflow-hidden px-1 text-nowrap text-clip sm:flex">
              {data.contactname}
            </div>
            <div className="hidden grow basis-50 overflow-hidden px-1 text-nowrap text-clip sm:flex">
              {data.adress}
            </div>
            <div className="hidden grow basis-50 overflow-hidden px-1 text-nowrap text-clip sm:flex">
              {data.city}
            </div>
            <div className="hidden grow basis-50 overflow-hidden px-1 text-nowrap text-clip sm:flex">
              {data.email}
            </div>
            <div className="flex w-6 px-1">
              <button
                className="cursor-pointer"
                onClick={() => EditRecordFunc(data.id_accounts)}
              >
                <Icons icon="List" />
              </button>
            </div>
            <div className="flex w-6 px-1">
              <button
                className="cursor-pointer"
                onClick={() => deleteRecord(data.id_accounts, data.fullname)}
              >
                <Icons icon="DeleteRow" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/** end Table data */}
    </>
  );
}
