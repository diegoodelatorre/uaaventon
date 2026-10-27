import db from '../conf/db.js';

export class UserModel {
  static async create(user: any) {
    const query = `
      INSERT INTO users (nombre, apellido_paterno, apellido_materno, email, password) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [user.nombre, user.apellido_paterno, user.apellido_materno, user.email, user.password];
    const [result] = await db.execute(query, values);
    return result;
  }

  static async findByEmail(email: string) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows]: any = await db.execute(query, [email]);
    return rows[0];
  }
}