import db from '../conf/db.js';

export class UserModel {
  static async create(user: any) {
    const query = `
      INSERT INTO users (first_name, last_name, uaa_email, password_hash) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [user.first_name, user.last_name, user.uaa_email, user.password_hash];
    const [result] = await db.execute(query, values);
    return result;
  }

  static async findByEmail(uaa_email: string) {
    const query = `SELECT * FROM users WHERE uaa_email = ?`;
    const [rows]: any = await db.execute(query, [uaa_email]);
    return rows[0];
  }
}