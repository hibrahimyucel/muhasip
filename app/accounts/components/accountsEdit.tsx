import React, { useEffect, useState } from "react";
import { accountsData } from "@/lib/orm/table-data";
import { Table } from "@/lib/orm/table";
import { TableProps } from "@/lib/orm/table-props";
import Icons, { Ico } from "@/components/icons";
import { useDebounce } from "@/lib/hooks/Debounce";

type accountsEditProps = {
  RecordId: number;
  onAdd: () => void;
};

function initAccountData() {
  const ad: Partial<accountsData> = {
    //id_accounts: 0,
    fullname: "",
    /*contactname: "",
    adress: "",
    city: "",
    country: "",
    postalcode: "",
    email: "",
    phone: "",
    mersis_id: "",
    tc_id: "",
    tax_id: "",
    taxoffice: "",
    is_person: false,
    is_member: false,
    is_customer: false,
    is_supplier: false,
    group: "",*/
  };
  return ad;
}

export default function AccountsEdit({ RecordId, onAdd }: accountsEditProps) {
  const [data, setData] = useState(initAccountData);
  const debouncedfullname = useDebounce(data);
  console.log(RecordId);
  const aInf = TableProps.accounts;
  async function getData() {
    const d: accountsData[] = await Table.accounts.GetbyID(RecordId);
    setData(d[0]);
  }
  async function SaveData() {
    console.log(data);
    if (RecordId === -1) Table.accounts.Insert(data);
    else Table.accounts.update(RecordId, data);
    onAdd();
  }

  useEffect(() => {
    if (RecordId > 0) getData();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-1">
        <div className="grid w-80 resize-none grid-cols-2 justify-start gap-1">
          <div className="bg-editbox border-editboxfocus col-span-2 w-79.5 flex-wrap rounded-sm border px-1">
            {TableProps.accounts.fullname.caption}
            <input
              type="text"
              name={aInf.fullname.name}
              defaultValue={data.fullname}
              maxLength={aInf.fullname.maxlength}
              onChange={(e) => setData({ ...data, fullname: e.target.value })}
              placeholder={aInf.fullname.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>
          <div className="bg-editbox border-editboxfocus col-span-2 w-79.5 rounded-sm border px-1">
            {aInf.contactname.caption}
            <input
              type="text"
              name={aInf.contactname.name}
              defaultValue={data.contactname}
              maxLength={aInf.contactname.maxlength}
              onChange={(e) =>
                setData({ ...data, contactname: e.target.value })
              }
              placeholder={aInf.contactname.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>

          <div className="bg-editbox border-editboxfocus col-span-2 w-79.5 rounded-sm border px-1">
            {aInf.group.caption}
            <input
              list="items"
              name={aInf.group.name}
              maxLength={aInf.group.maxlength}
              onChange={(e) => setData({ ...data, acc_group: e.target.value })}
              placeholder={aInf.group.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
            <datalist id="items">
              <option value="123" />
              <option value="124" />
              <option value="135" />
            </datalist>
          </div>

          <div className="bg-editbox border-editboxfocus w-39 rounded-sm border">
            <button
              type="button"
              className="flex h-full w-full flex-nowrap gap-1"
              onClick={() => setData({ ...data, is_person: !data.is_person })}
            >
              <Icons icon={data.is_person ? Ico.icoChecked : Ico.icoCheckedX} />
              {aInf.is_person.caption}
            </button>
          </div>
          <div className="bg-editbox border-editboxfocus w-39 rounded-sm border">
            <button
              type="button"
              className="flex h-full w-full flex-nowrap gap-1"
              onClick={() => setData({ ...data, is_member: !data.is_member })}
            >
              <Icons icon={data.is_member ? Ico.icoChecked : Ico.icoCheckedX} />
              {aInf.is_member.caption}
            </button>
          </div>
          <div className="bg-editbox border-editboxfocus w-39 rounded-sm border">
            <button
              type="button"
              className="flex h-full w-full flex-nowrap gap-1"
              onClick={() =>
                setData({ ...data, is_customer: !data.is_customer })
              }
            >
              <Icons
                icon={data.is_customer ? Ico.icoChecked : Ico.icoCheckedX}
              />
              {aInf.is_customer.caption}
            </button>
          </div>

          <div className="bg-editbox border-editboxfocus w-39 rounded-sm border">
            <button
              type="button"
              className="flex h-full w-full flex-nowrap gap-1"
              onClick={() =>
                setData({ ...data, is_supplier: !data.is_supplier })
              }
            >
              <Icons
                icon={data.is_supplier ? Ico.icoChecked : Ico.icoCheckedX}
              />
              {aInf.is_supplier.caption}
            </button>
          </div>
        </div>
        <div className="grid w-80 grid-cols-1 justify-start gap-0.5">
          <div className="bg-editbox border-editboxfocus h-19 w-79.5 rounded-sm border px-0.5">
            {aInf.adress.caption}
            <textarea
              name={aInf.adress.name}
              defaultValue={data.adress}
              maxLength={aInf.adress.maxlength}
              onChange={(e) => setData({ ...data, adress: e.target.value })}
              placeholder={aInf.adress.caption}
              className="focus:bg-editboxfocus h-12 w-full resize-none rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>

          <div className="bg-editbox border-editboxfocus w-79.5 rounded-sm border px-0.5">
            {aInf.city.caption}
            <input
              type="text"
              name={aInf.city.name}
              defaultValue={data.city}
              maxLength={aInf.city.maxlength}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              placeholder={aInf.city.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>
          <div className="bg-editbox border-editboxfocus w-79.5 rounded-sm border px-0.5 py-0.5">
            {aInf.postalcode.caption}
            <input
              type="text"
              name={aInf.postalcode.name}
              defaultValue={data.postalcode}
              maxLength={aInf.postalcode.maxlength}
              onChange={(e) => setData({ ...data, postalcode: e.target.value })}
              placeholder={aInf.postalcode.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>
          <div className="bg-editbox border-editboxfocus w-79.5 rounded-sm border px-0.5 py-0.5">
            {aInf.country.caption}
            <input
              type="text"
              name={aInf.country.name}
              defaultValue={data.country}
              maxLength={aInf.country.maxlength}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              placeholder={aInf.country.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>
        </div>
        <div className="grid w-80 grid-cols-2 justify-start gap-1">
          <div className="bg-editbox border-editboxfocus col-span-2 w-79.5 rounded-sm border px-0.5">
            {aInf.email.caption}
            <input
              type="text"
              name={aInf.email.name}
              defaultValue={data.email}
              maxLength={aInf.email.maxlength}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder={aInf.email.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>

          <div className="bg-editbox border-editboxfocus col-span-2 w-79.5 rounded-sm border px-0.5 py-0.5">
            {aInf.phone.caption}
            <input
              type="text"
              name={aInf.phone.name}
              defaultValue={data.phone}
              maxLength={aInf.phone.maxlength}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder={aInf.phone.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>

          <div className="bg-editbox border-editboxfocus w-39.5 rounded-sm border px-0.5">
            {aInf.mersis_id.caption}
            <input
              type="text"
              name={aInf.mersis_id.name}
              defaultValue={data.mersis_id}
              maxLength={aInf.mersis_id.maxlength}
              onChange={(e) => setData({ ...data, mersis_id: e.target.value })}
              placeholder={aInf.mersis_id.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>

          <div className="bg-editbox border-editboxfocus w-39.5 rounded-sm border px-0.5">
            {aInf.tc_id.caption}
            <input
              type="text"
              name={aInf.tc_id.name}
              defaultValue={data.tc_id}
              maxLength={aInf.tc_id.maxlength}
              onChange={(e) => setData({ ...data, tc_id: e.target.value })}
              placeholder={aInf.tc_id.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>

          <div className="bg-editbox border-editboxfocus w-39.5 rounded-sm border px-0.5">
            {aInf.tax_id.caption}
            <input
              type="text"
              name={aInf.tax_id.name}
              defaultValue={data.tax_id}
              maxLength={aInf.tax_id.maxlength}
              onChange={(e) => setData({ ...data, tax_id: e.target.value })}
              placeholder={aInf.tax_id.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>
          <div className="bg-editbox border-editboxfocus w-39.5 rounded-sm border px-0.5">
            {aInf.taxoffice.caption}
            <input
              type="text"
              name={aInf.taxoffice.name}
              defaultValue={data.taxoffice}
              maxLength={aInf.taxoffice.maxlength}
              onChange={(e) => setData({ ...data, taxoffice: e.target.value })}
              placeholder={aInf.taxoffice.caption}
              className="focus:bg-editboxfocus w-full rounded-sm px-1 outline-0 focus:outline-0"
            />
          </div>
        </div>
      </div>

      <div className="grid h-10 w-60 grid-cols-2 gap-2 place-self-end-safe p-3">
        <div className="hover:bg-editbox bg-editboxfocus border-diffcolor rounded-md border sm:block">
          <button
            type="button"
            className="flex h-10 w-25 items-center justify-center gap-2"
            onClick={() => SaveData()}
          >
            Kaydet
            <Icons icon={Ico.icoOk} />
          </button>
        </div>
        <div className="hover:bg-editbox bg-editboxfocus border-diffcolor rounded-md border sm:block">
          <button
            type="button"
            className="flex h-10 w-25 items-center justify-center gap-2"
            onClick={() => onAdd()}
          >
            İptal
            <Icons icon={Ico.icoCancel} />
          </button>
        </div>
      </div>
    </div>
  );
}
