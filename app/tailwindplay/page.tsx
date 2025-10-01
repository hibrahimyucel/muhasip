import React from "react";
import { TableProps } from "@/lib/orm/table-props";
import Icons from "@/components/icons";
export default function page() {
  const inf = TableProps.accounts;
  return (
    <div className="grid w-full columns-1">
      <div className="flex w-full gap-1 border p-2">
        {/** 1 */}
        <div className="border-bordercolor flex grow-1 basis-50 flex-col rounded-t-md border">
          <button className="flex">
            <h2 className="flex w-full justify-center overflow-hidden px-1 text-nowrap text-clip">
              {inf.fullname.caption} .. ......
            </h2>
            <div className="right-0 pr-1 text-2xl">
              <Icons icon="List" />
            </div>
          </button>
          <input
            type="text"
            name={inf.fullname.name}
            maxLength={inf.fullname.maxlength}
            className="focus:bg-editboxfocus bg-editbox border-bordercolor flex w-full border-t px-1 outline-0"
          />
        </div>
        {/** 2 */}
        <div className="border-bordercolor flex grow-1 basis-20 flex-col rounded-t-md border">
          <button className="flex">
            <h2 className="flex w-full justify-center overflow-hidden px-1 text-nowrap text-clip">
              {inf.adress.caption} ........ ....... .. ..
            </h2>
            <div className="right-0 pr-1 text-2xl">
              <Icons icon="List" />
            </div>
          </button>
          <input
            type="text"
            name={inf.adress.name}
            maxLength={inf.adress.maxlength}
            className="focus:bg-editboxfocus bg-editbox flex w-full border-t px-1 outline-0"
          />
        </div>
        {/** 3 */}
        <div className="basis-10 flex-col rounded-t-md border"></div>
        <div className="basis-10 flex-col rounded-t-md border"></div>
        <div className="basis-10 flex-col rounded-t-md border"></div>
        <div className="basis-20 flex-col rounded-t-md border"></div>
      </div>
      <div className="flex w-full flex-col">
        <div className="bg-background">1 111111111111</div>
        <div className="bg-diffcolor">1 diff</div>
        <div className="bg-background">1 111111111111</div>
        <div className="bg-editbox">1 edit</div>
        <div className="bg-editboxfocus">1 focus</div>
        <div className="bg-background">1 111111111111</div>
      </div>
    </div>
  );
}
