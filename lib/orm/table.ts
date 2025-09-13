import { UsersTable } from "./table-users";

export * from "./table-users";

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
