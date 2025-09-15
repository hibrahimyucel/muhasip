import { UsersData } from "./table-data";
import { TableBase } from "./orm-base";

class UsersTable extends TableBase<UsersData, number> {
  constructor() {
    super("users", "idusers", "");
  }
}

class Tables {
  constructor() {}
  _Users: UsersTable | null = null;
  get Users() {
    if (!this._Users) {
      this._Users = new UsersTable();
    }
    return this._Users;
  }
}
export const Table = new Tables();
