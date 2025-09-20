export interface accountsData {
  id_accounts: number;
  fullname: string;
  contactname: string;
  adress: string;
  city: string;
  country: string;
  postalcode: string;
  email: string;
  phone: string;
  mersis_id: string;
  tc_id: string;
  tax_id: string;
  taxoffice: string;
  is_person: boolean;
  is_member: boolean;
  is_customer: boolean;
  is_supplier: boolean;
  group: string;
}
export interface usersData {
  id_users: number;
  email: string;
  fullname: string;
  idClerk: string;
}
