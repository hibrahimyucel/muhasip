import { getConn } from "./mysql";

export async function insertUser(
  fullname: string,
  email: string,
  idClerk: string,
  imgurl: string
) {
  const conn = await getConn();
  let results = await conn.query(
    "SELECT * FROM defaultdb.users where idclerk = ? ",
    [idClerk]
  );

  if (results.values.length == 0) {
    const sql =
      "INSERT INTO defaultdb.users ( fullname, email, idclerk,imgurl) VALUES ( ?, ?, ?, ?)";
    await conn.execute(sql, [fullname, email, idClerk, imgurl]);
  }
  conn.end();
}
