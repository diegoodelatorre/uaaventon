import { User, type IUser } from "../models/index.js";

export class UserService {
  public async create(userData: IUser): Promise<User> {
    return await User.create({
      first_name: userData.first_name,
      last_name: userData.last_name,
      uaa_email: userData.uaa_email,
      password_hash: userData.password_hash,
    });
  }

  public async findByEmail(uaa_email: string): Promise<User | null> {
    return await User.findOne({
      where: { uaa_email },
    });
  }
}