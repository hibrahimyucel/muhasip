/* 
Object Relational Mapping Database Tools
Created : 10.09.2025 İbrahim YÜCEL
Comment : Base class for all simple CRUD operations on tables&views 
*/

export type sqlOperator = "=" | "LIKE" | ">" | "<";

export async function ORMQuery(
  sql: string,
  params: unknown[],
  api: string = "/api/db",
): Promise<[]> {
  try {
    const res = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify({ Sql: sql, Params: params }),
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    throw new Error(`Failed to retrieve records: ${(error as Error).message}`);
  }
  return [];
}

export abstract class TableBase<T> {
  tableName: string;
  idField: string;
  apiPath: string;

  constructor(tableName: string, idField: string, apiPath: string) {
    this.tableName = tableName;
    this.idField = idField;
    this.apiPath = apiPath ? apiPath : "/api/db";
  }

  /* 
  usage GetData
  const usr = await Table.Users.GetData([
       [{ fullname: "1%", email: "q%" }, "LIKE"],
       [{ fullname: "1%", email: "q%" }, "="],
     ]);
 */

  async getData(
    whereProps: { terms: Partial<T>; condition: sqlOperator }[],
  ): Promise<T[]> {
    let whereClause: string = "";
    const paramValues: string[] = [];

    whereProps.map((whereProp, index) => {
      const keys = Object.keys(whereProp.terms);
      const values = Object.values(whereProp.terms);
      values.map((v) => paramValues.push(encodeURIComponent(v as string)));

      whereClause += index ? "AND " : "";
      whereClause += keys
        .map((key) => `${key} ${whereProp.condition} ? `)
        .join("AND ");
    });

    whereClause = whereClause ? `OR ( ${whereClause}  )` : "";
    const sql = `SELECT * FROM ${this.tableName} WHERE 1=2 ${whereClause}`;
    return await ORMQuery(sql, paramValues);
  }
  async getbyID(RecordId: number): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${this.idField} = ?`;
    return await ORMQuery(sql, [RecordId.toString()]);
  }

  async insert(fields: Partial<T>): Promise<T> {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const paramValues: unknown[] = [];
    values.map((v) => {
      if (v == null) {
        paramValues.push(null);
      } else if (v == true) {
        paramValues.push(1);
      } else if (v == false) {
        paramValues.push(0);
      } else paramValues.push(encodeURIComponent(v as string));
    });
    const placeholders = keys.map(() => ` ?`).join(", ");
    const keysString = keys.join(", ");

    const sql = `INSERT INTO ${this.tableName} (${keysString}) VALUES (${placeholders}) RETURNING *;`;

    try {
      const results = await ORMQuery(sql, paramValues);
      return results as T;
    } catch (error) {
      throw new Error(`Failed to save record: ${(error as Error).message}`);
    }
  }

  async update(id: number, fields: Partial<T>): Promise<void> {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    keys.shift();
    values.shift();

    const paramValues: unknown[] = [];
    values.map((v) => {
      if (v == null) {
        paramValues.push(null);
      } else if (v == true) {
        paramValues.push(1);
      } else if (v == false) {
        paramValues.push(0);
      } else paramValues.push(encodeURIComponent(v as string));
    });
    if (keys.length === 0) {
      throw new Error("No fields to update.");
    }
    console.log(paramValues);

    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.idField} = ?`;

    try {
      await ORMQuery(sql, [...paramValues, id]);
      return undefined;
    } catch (error) {
      throw new Error(`Failed to update record: ${(error as Error).message}`);
    }
  }

  async delete(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.tableName} WHERE ${this.idField} = ?`;

    try {
      await ORMQuery(sql, [id]);
      return;
    } catch (error) {
      throw new Error(`Failed to delete record: ${(error as Error).message}`);
    }
  }

  async getAll(): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName}`;

    try {
      const res = await fetch(this.apiPath, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          data: JSON.stringify({ Sql: sql, Params: [] }),
        },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      throw new Error(
        `Failed to retrieve records: ${(error as Error).message}`,
      );
    }

    return [];
  }

  /*
  async findAllWhere<K extends keyof T>(key: K, value: T[K]): Promise<T[]> {
    const sql = `
      SELECT * FROM ${this.tableName}
      WHERE ${camelToSnake(String(key))} = $1
    `;

    try {
      const [fields, results] = await (await getConn()).query(sql, [value]);
      return results as T[];
    } catch (error: any) {
      throw new Error(`Failed to retrieve record: ${error.message}`);
    }
  }
  /*
  async findFirstWhere<K extends keyof T>(
    key: K,
    value: T[K],
  ): Promise<T | null> {
    const sql = `
      SELECT * FROM ${this.tableName}
      WHERE ${camelToSnake(String(key))} = $1
      LIMIT 1
    `;

    try {
      const [fields, results] = await (await getConn()).query(sql, [value]);
      const row = results[0];
      if (row) {
        return snakeToCamel(row) as T;
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Failed to retrieve record: ${error.message}`);
    }
  }
*/
}
