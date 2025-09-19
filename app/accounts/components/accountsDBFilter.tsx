import React, { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/Debounce";
import Icons from "@/components/icons";
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
  is_person?: string;
};
type AccountsDBFilterProps = {
  onChange: (filters: accountsFilter) => void;
};

export function AccountsDBFilter({ onChange }: AccountsDBFilterProps) {
  const [fullname, setfullname] = useState<accountsFilter["fullname"]>("");
  const debouncedfullname = useDebounce(fullname);

  useEffect(() => {
    onChange({ fullname: debouncedfullname });
  }, [debouncedfullname]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-wrap gap-1">
        <div className="bg-editbox border-editboxfocus w-60.5 rounded-sm px-0.5 py-0.5">
          {" Ticari Ünvanı"}
          <input
            type="text"
            value={fullname}
            maxLength={150}
            onChange={(e) => setfullname(e.target.value)}
            placeholder="Ticari Ünvanı"
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
        </div>
        <div className="bg-editbox border-editboxfocus w-60.5 rounded-sm px-0.5 py-0.5">
          {" Hesap Adı"}
          <input
            type="text"
            value={fullname}
            maxLength={150}
            onChange={(e) => setfullname(e.target.value)}
            placeholder="Hesap adı"
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
        </div>
        <div className="bg-editbox border-editboxfocus w-60.5 rounded-sm px-0.5 py-0.5">
          {" Şehir"}
          <input
            type="text"
            value={""}
            maxLength={150}
            onChange={(e) => setfullname(e.target.value)}
            placeholder="Şehir"
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
        </div>
        <div className="bg-editbox border-editboxfocus w-60.5 rounded-sm px-0.5 py-0.5">
          {" Hesap Grubu"}
          <input
            list="items"
            placeholder="Hesap grubu"
            className="focus:bg-editboxfocus w-60 rounded-sm px-1 outline-0 focus:outline-0"
          />
          <datalist id="items">
            <option value="123" />
            <option value="124" />
            <option value="135" />
          </datalist>
        </div>

        <div className="bg-editbox border-editboxfocus w-30.5 rounded-sm px-0.5 py-0.5">
          {" Hesap Tipi "}
          <select
            id="items1"
            className="focus:bg-editboxfocus w-30 rounded-sm px-1 outline-0 focus:outline-0"
          >
            <option value="0">Hepsi</option>
            <option value="1">Alıcı</option>
            <option value="2">Satıcı</option>
            <option value="3">Personel</option>
          </select>
        </div>
      </div>
      <div className="hover:bg-editbox bg-editboxfocus border-diffcolor mx-1 rounded-md border sm:block">
        <button
          type="button"
          className="flex h-full w-25 items-center justify-center"
        >
          <Icons icon="icoList" />
          Listele
        </button>
      </div>
    </div>
  );
}

export default AccountsDBFilter;
