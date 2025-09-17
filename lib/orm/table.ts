import { accountsData, usersData } from "./table-data";
import { TableBase } from "./orm-base";

class usersTable extends TableBase<usersData> {
  constructor() {
    super("users", "idusers", "");
  }
}
class accountsTable extends TableBase<accountsData> {
  constructor() {
    super("accounts", "id_accounts", "");
  }
}

class Tables {
  constructor() {}
  _users?: usersTable;
  get users() {
    if (!this._users) this._users = new usersTable();

    return this._users;
  }
  _accounts?: accountsTable;
  get accounts() {
    if (!this._accounts) this._accounts = new accountsTable();
    return this._accounts;
  }
}
export const Table = new Tables();
