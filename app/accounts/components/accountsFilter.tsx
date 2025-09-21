import React from "react";
import Icons from "@/components/icons";
import { TableProps } from "@/lib/orm/table-props";
export default function AccountsFilter() {
  const inf = TableProps.accounts;
  return (
    <div className="flex gap-0.5">
      <div className="flex w-65 flex-col rounded-t-md border">
        <button className="right-0 flex h-7 w-65">
          <h2 className="flex w-full justify-center">{inf.fullname.caption}</h2>
          <div className="right-0 pr-1 text-2xl">
            <Icons icon="icoList" />
          </div>
        </button>
        <input
          type="text"
          name={inf.fullname.name}
          maxLength={inf.fullname.maxlength}
          className="flex w-full border-t px-1 outline-0"
        />
      </div>
      <div className="flex w-50 flex-col rounded-t-md border">
        <button className="right-0 flex h-7 w-50">
          <h2 className="flex w-full justify-center">
            {inf.contactname.caption}
          </h2>
          <div className="right-0 pr-1 text-2xl">
            <Icons icon="icoList" />
          </div>
        </button>
        <input
          type="text"
          name={inf.contactname.name}
          maxLength={inf.contactname.maxlength}
          className="flex w-full border-t px-1 outline-0"
        />
      </div>

      <div className="flex w-80 flex-col rounded-t-md border">
        <button className="right-0 flex h-7 w-80">
          <h2 className="flex w-full justify-center">{inf.adress.caption}</h2>
          <div className="right-0 pr-1 text-2xl">
            <Icons icon="icoList" />
          </div>
        </button>
        <input
          type="text"
          name={inf.adress.name}
          maxLength={inf.adress.maxlength}
          className="flex w-full border-t px-1 outline-0"
        />
      </div>
      <div className="flex w-40 flex-col rounded-t-md border">
        <button className="right-0 flex h-7 w-40">
          <h2 className="flex w-full justify-center">{inf.city.caption}</h2>
          <div className="right-0 pr-1 text-2xl">
            <Icons icon="icoList" />
          </div>
        </button>
        <input
          type="text"
          name={inf.city.name}
          maxLength={inf.city.maxlength}
          className="flex w-full border-t px-1 outline-0"
        />
      </div>
      <div className="flex w-65 flex-col rounded-t-md border">
        <button className="right-0 flex h-7 w-65">
          <h2 className="flex w-full justify-center">{inf.email.caption}</h2>
          <div className="right-0 pr-1 text-2xl">
            <Icons icon="icoList" />
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
  );
}
