import React, { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/Debounce";
import Icons, { Ico } from "@/components/icons";
import { accountsData } from "@/lib/orm/table-data";
import { sqlOperator } from "@/lib/orm/orm-base";
import { Table } from "@/lib/orm/table";
import { TableProps } from "@/lib/orm/table-props";
export type accountsFilter = {
  fullname?: string;
  contactname?: string;
  adress?: string;
  city?: string;
  country?: string;
  postalcode?: string;
  email?: string;
  phone?: string;
  mersis_id?: string;
  tc_id?: string;
  tax_id?: string;
  taxoffice?: string;
  is_member?: boolean;
  is_customer?: boolean;
  is_supplier?: boolean;
  group?: string;
};
type AccountsDBFilterProps = {
  onChange: (data: accountsData[]) => void;
  onAdd: () => void;
};

function initAccountData() {
  const ad: Partial<accountsData> = {
    //id_accounts: 0,
    fullname: "" /*
    id_accounts: 0,
    fullname: "",
    contactname: "",
    adress: "",
    city: "",
    country: "",
    postalcode: "",
    email: "",
    phone: "",
    mersis_id: "",
    tc_id: "",
    tax_id: "",
    taxoffice: "",*/,
    is_person: false,
    is_member: false,
    is_customer: false,
    is_supplier: false,
  };
  return ad;
}

export function AccountsDBFilter({ onChange, onAdd }: AccountsDBFilterProps) {
  const [accFilters, setaccFilters] =
    useState<Partial<accountsData>>(initAccountData);
  const debouncedfullname = useDebounce(accFilters);

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
    onChange(value);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex w-full justify-start pb-1 sm:justify-center">
      <div className="flex flex-wrap gap-1">
        <div className="bg-editbox border-editboxfocus w-50 rounded-sm px-0.5 py-0.5 sm:w-59.5">
          {TableProps.accounts.fullname.caption}
          <input
            type="text"
            name={TableProps.accounts.fullname.name}
            defaultValue={accFilters.fullname}
            maxLength={100}
            onChange={(e) =>
              setaccFilters({ ...accFilters, fullname: e.target.value })
            }
            placeholder={TableProps.accounts.fullname.caption}
            className="focus:bg-editboxfocus w-49.5 rounded-sm px-1 outline-0 focus:outline-0 sm:w-59"
          />
        </div>
        <div className="bg-editbox border-editboxfocus hidden w-60.5 rounded-sm px-0.5 py-0.5 sm:block">
          {TableProps.accounts.contactname.caption}
          <input
            type="text"
            name={TableProps.accounts.contactname.name}
            defaultValue={accFilters.contactname}
            maxLength={50}
            onChange={(e) =>
              setaccFilters({ ...accFilters, contactname: e.target.value })
            }
            placeholder={TableProps.accounts.contactname.caption}
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
        </div>
        <div className="bg-editbox border-editboxfocus hidden w-60.5 rounded-sm px-0.5 py-0.5 sm:block">
          {TableProps.accounts.city.caption}
          <input
            type="text"
            name={TableProps.accounts.city.name}
            defaultValue={accFilters.city}
            maxLength={20}
            onChange={(e) =>
              setaccFilters({ ...accFilters, city: e.target.value })
            }
            placeholder={TableProps.accounts.city.caption}
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
        </div>
        <div className="bg-editbox border-editboxfocus hidden w-60.5 rounded-sm px-0.5 py-0.5 sm:block">
          {TableProps.accounts.group.caption}
          <input
            list="items"
            name={TableProps.accounts.group.name}
            maxLength={50}
            onChange={(e) =>
              setaccFilters({ ...accFilters, acc_group: e.target.value })
            }
            placeholder={TableProps.accounts.group.caption}
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
            onChange={(e) => {
              switch (e.target.value) {
                case "1":
                  setaccFilters({
                    ...accFilters,
                    is_member: false,
                    is_customer: true,
                    is_supplier: false,
                  });
                case "2":
                  setaccFilters({
                    ...accFilters,
                    is_member: false,
                    is_customer: false,
                    is_supplier: true,
                  });
                case "3":
                  setaccFilters({
                    ...accFilters,
                    is_member: true,
                    is_customer: false,
                    is_supplier: false,
                  });
                default:
                  setaccFilters({
                    ...accFilters,
                    is_member: false,
                    is_customer: false,
                    is_supplier: false,
                  });
              }
            }}
            className="focus:bg-editboxfocus w-30 rounded-sm px-1 outline-0 focus:outline-0"
          >
            <option value="0">Hepsi</option>
            <option value="1">Alıcı</option>
            <option value="2">Satıcı</option>
            <option value="3">Personel</option>
          </select>
        </div>
      </div>
      <div className="hover:bg-editbox bg-editboxfocus border-diffcolor rounded-md border sm:block">
        <button
          type="button"
          className="flex h-full w-12 items-center justify-center"
          onClick={getData}
        >
          <Icons icon={Ico.icoList} />
        </button>
      </div>
      <div className="hover:bg-editbox bg-editboxfocus border-diffcolor rounded-md border sm:block">
        <button
          type="button"
          className="flex h-full w-12 items-center justify-center"
          onClick={() => onAdd()}
        >
          <Icons icon={Ico.icoAdd} />
        </button>
      </div>
    </div>
  );
}

export default AccountsDBFilter;
