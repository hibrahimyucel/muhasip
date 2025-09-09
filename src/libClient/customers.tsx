export type TCustomer = {
  idcustomers: number | null;
  name: string;
  adress: string;
  city: string;
  phone: string;
};

export type TCustomerField = "name" | "adress" | "city";

export type TCustomerSort = {
  field: TCustomerField;
  ascending: boolean;
};

export type TCustomerFilter = {
  field: TCustomerField;
  value: string;
};

export async function getCustomers(pname: string, pcity: string) {
  let value = [];

  const res = await fetch("/api/customers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      data: JSON.stringify({ name: pname, city: pcity }),
    },
  });

  if (res.ok) {
    const resp = await res.json();
    value = resp.results;
  }
  return value;
}
export async function saveCustomers(cdata: TCustomer) {
  let value = [];

  const pdata: TCustomer = {
    idcustomers: cdata.idcustomers,
    name: encodeURIComponent(cdata.name),
    city: encodeURIComponent(cdata.city),
    adress: encodeURIComponent(cdata.adress),
    phone: encodeURIComponent(cdata.phone),
  };

  const res = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      data: JSON.stringify(pdata),
    },
  });

  if (res.ok) {
    const resp = await res.json();
    value = resp.results;
  }
  return value;
}
