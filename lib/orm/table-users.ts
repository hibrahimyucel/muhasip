import { TableBase } from "../orm/orm-base";

export interface UsersData {
  id?: number;
  fullname?: string | null;
  email?: string | null;
  idclerk?: string | null;
}

export class UsersTable extends TableBase<UsersData, number> {
  constructor() {
    super("users", "id", "");
  }
}
