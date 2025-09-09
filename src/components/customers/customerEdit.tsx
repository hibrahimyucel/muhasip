import { saveCustomers, TCustomer } from "@/libClient/customers";
import focusOrder from "@/libClient/focusOrder";
import Icons from "@/libClient/icons";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const taborder = [".", "name", "adress", "city", "phone", "ok"];
export default function CustomerEdit({
  isOpenFunc,
  customer,
}: {
  isOpenFunc: () => void;
  customer: TCustomer;
}) {
  const [cdata, setcdata] = useState(customer);

  function saveCustomer() {
    saveCustomers(cdata);
    isOpenFunc();
    redirect("/customers");
  }

  useEffect(() => {
    if (cdata && cdata !== customer) isOpenFunc();

    setcdata(customer);
  }, [customer]);

  return (
    <div className="flex w-full flex-col justify-start gap-0.5 sm:flex-row">
      <div className="w-10"></div>
      <div className="sm:hidden">Name</div>
      <input
        id="name"
        type="text"
        maxLength={100}
        defaultValue={cdata ? cdata.name : ""}
        onChange={(e) => (cdata.name = e.target.value)}
        onKeyUp={(e) => focusOrder(e, taborder)}
        className="w-65 rounded-b-md border px-1"
      />{" "}
      <div className="sm:hidden">City</div>
      <input
        id="city"
        type="text"
        defaultValue={cdata ? cdata.city : ""}
        maxLength={45}
        onChange={(e) => (cdata.city = e.target.value)}
        onKeyUp={(e) => focusOrder(e, taborder)}
        className="w-40 rounded-b-md border px-1"
      />
      <div className="sm:hidden">unused</div>
      <input
        disabled
        id="unused"
        type="tel"
        maxLength={15}
        defaultValue={cdata ? cdata.phone : ""}
        onChange={(e) => (cdata.phone = e.target.value)}
        onKeyUp={(e) => focusOrder(e, taborder)}
        className="w-40 rounded-b-md border px-1"
      />
      <div className="sm:hidden">Phone</div>
      <input
        id="phone"
        type="tel"
        maxLength={15}
        defaultValue={cdata ? cdata.phone : ""}
        onChange={(e) => (cdata.phone = e.target.value)}
        onKeyUp={(e) => focusOrder(e, taborder)}
        className="w-40 rounded-b-md border px-1"
      />
      <div className="sm:hidden">Adress</div>
      <input
        id="adres"
        type="text"
        defaultValue={cdata ? cdata.adress : ""}
        onChange={(e) => (cdata.adress = e.target.value)}
        maxLength={200}
        onKeyUp={(e) => focusOrder(e, taborder)}
        className="w-71.5 rounded-b-md border px-1"
      />
      <div className="flex flex-row justify-center gap-0.5">
        <button
          id="btnCancel"
          className="flex w-8 items-center justify-center rounded-b-md border text-2xl"
          onClick={() => {
            saveCustomer();
          }}
        >
          <Icons icon="icoOk" />
        </button>
        <button
          id="btnOk"
          onClick={() => isOpenFunc()}
          className="flex w-8 items-center justify-center rounded-b-md border text-2xl"
        >
          <Icons icon="icoCancel" />
        </button>
      </div>
    </div>
  );
}
