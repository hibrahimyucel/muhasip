import { getConn } from "./mysql";

export async function insertUser(
  fullname: string,
  email: string,
  idClerk: string,
) {
  const conn = await getConn();
  const results = await conn.query(
    "SELECT * FROM defaultdb.users where idclerk = ? ",
    [idClerk],
  );

  if (results.values.length == 0) {
    const sql =
      "INSERT INTO defaultdb.users ( fullname, email, idclerk) VALUES (  ?, ?, ?)";
    await conn.execute(sql, [fullname, email, idClerk]);
  }
  conn.end();
}
