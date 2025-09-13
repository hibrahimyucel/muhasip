export abstract class Table<T, IDType> {
  tableName: string;
  idField: string;
  apiPath: string;

  constructor(tableName: string, idField: string, apiPath: string) {
    this.tableName = tableName;
    this.idField = idField;
    this.apiPath = apiPath ? apiPath : "/api/db";
  }

  /*
  async Insert(fields: Partial<T>): Promise<T> {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(", ");
    const keysString = keys.join(", ");

    const sql = `
      INSERT INTO ${this.tableName}
      (${keysString}) VALUES (${placeholders})
      RETURNING *;`;

    try {
      const results = await (await getConn()).execute(sql, values);
      return snakeToCamel(results) as T;
    } catch (error: any) {
      throw new Error(`Failed to save record: ${error.message}`);
    }
  }

  async update(id: IDType, fields: Partial<T>): Promise<void> {
    const keys = Object.keys(camelToSnake(fields));
    const values = Object.values(fields);

    if (keys.length === 0) {
      throw new Error("No fields to update.");
    }

    const idIndex = keys.length + 1;
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const sql = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE ${this.idField} = $${idIndex}
    `;

    try {
      await (await getConn()).query(sql, [...values, id]);
      return undefined;
    } catch (error: any) {
      throw new Error(`Failed to update record: ${error.message}`);
    }
  }
  async delete(id: IDType): Promise<void> {
    const sql = `
      DELETE FROM ${this.tableName}
      WHERE ${this.idField} = $1
    `;

    try {
      await (await getConn()).execute(sql, [id]);
      return;
    } catch (error: any) {
      throw new Error(`Failed to delete record: ${error.message}`);
    }
  }
  async findFirst(id: IDType): Promise<T | null> {
    const sql = `
      SELECT * FROM ${this.tableName}
      WHERE ${this.idField} = $1
      LIMIT 1
    `;

    try {
      const [fields, results] = await (await getConn()).query(sql, [id]);
      return (snakeToCamel(results[0]) as T) || null;
    } catch (error: any) {
      throw new Error(`Failed to retrieve record: ${error.message}`);
    }
  }*/
  async findAll(): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName}`;
    console.log(this.apiPath);
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
    } catch (error: any) {
      throw new Error(`Failed to retrieve records: ${error.message}`);
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
