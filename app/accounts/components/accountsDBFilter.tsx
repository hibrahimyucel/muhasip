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
    <div className="flex w-full flex-wrap gap-1">
      <div className="bg-editbox border-editboxfocus m-0.5 rounded-sm border p-1">
        {" Ticari Ünvanı : "}
        <input
          type="text"
          value={fullname}
          maxLength={150}
          onChange={(e) => setfullname(e.target.value)}
          placeholder="Ünvan"
          className="focus:bg-editboxfocus w-50 rounded-sm px-1 outline-0 focus:outline-0"
        />
      </div>
      <div className="bg-editbox border-editboxfocus m-0.5 rounded-sm border p-1 sm:block">
        {" Hesap Adı : "}
        <input
          type="text"
          value={fullname}
          maxLength={150}
          onChange={(e) => setfullname(e.target.value)}
          placeholder="Ünvan"
          className="focus:bg-editboxfocus border-editbox h-full w-50 rounded-sm px-1 outline-0 focus:outline-0"
        />
      </div>
      <div className="bg-editbox border-editboxfocus m-0.5 rounded-sm border p-1 sm:block">
        {" Şehir : "}
        <input
          type="text"
          value={""}
          maxLength={150}
          onChange={(e) => setfullname(e.target.value)}
          placeholder="Ünvan"
          className="focus:bg-editboxfocus border-editbox h-full w-50 rounded-sm px-1 outline-0 focus:outline-0"
        />
      </div>
      <div className="bg-editbox border-editboxfocus m-0.5 rounded-sm border p-1 sm:block">
        <label>Choose or type an option:</label>
        <input list="items" name="combo" id="combo" />
        <datalist id="items">
          <option value="123" />
          <option value="124" />
          <option value="135" />
        </datalist>
      </div>

      <div className="bg-editbox border-editboxfocus m-0.5 rounded-sm border p-1 sm:block">
        {" Alıcı : "}
        <input
          type="checkbox"
          maxLength={150}
          onChange={(e) => setfullname(e.target.value)}
          placeholder="Ünvan"
          className="focus:bg-editboxfocus border-editbox rounded-sm px-1 outline-0 focus:outline-0"
        />
      </div>
      <div className="bg-editbox border-editboxfocus m-0.5 rounded-sm border p-1 sm:block">
        {" Satıcı : "}
        <input
          type="checkbox"
          maxLength={150}
          onChange={(e) => setfullname(e.target.value)}
          placeholder="Ünvan"
          className="focus:bg-editboxfocus border-editbox rounded-sm px-1 outline-0 focus:outline-0"
        />
      </div>
      <div className="bg-editbox border-editboxfocus m-0.5 rounded-sm border p-1 sm:block">
        {" Personel : "}
        <input
          type="checkbox"
          maxLength={150}
          onChange={(e) => setfullname(e.target.value)}
          placeholder="Ünvan"
          className="focus:bg-editboxfocus border-editbox rounded-sm px-1 outline-0 focus:outline-0"
        />
      </div>
      <div className="bg-editbox border-editboxfocus hover:bg-editboxfocus m-0.5 rounded-sm border sm:block">
        <button
          type="button"
          className="flex h-full w-20 items-center justify-center"
        >
          <Icons icon="icoList" />
          Listele
        </button>
      </div>
    </div>
  );
}

export default AccountsDBFilter;
