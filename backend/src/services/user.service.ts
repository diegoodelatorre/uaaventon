import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../conf/db.js";
import { User, type IUser } from "../models/index.js";

export class UserService {
  public async create(userData: IUser): Promise<ResultSetHeader> {
    const user = new User(userData);
    const query = `
      INSERT INTO users (first_name, last_name, uaa_email, password_hash) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      user.first_name,
      user.last_name,
      user.uaa_email,
      user.password_hash,
    ];
    const [result] = await db.execute<ResultSetHeader>(query, values);
    return result;
  }

  public async findByEmail(uaa_email: string): Promise<IUser | undefined> {
    const query = `SELECT * FROM users WHERE uaa_email = ?`;
    const [rows] = await db.execute<RowDataPacket[]>(query, [uaa_email]);
    return rows[0] as IUser | undefined;
  }
}