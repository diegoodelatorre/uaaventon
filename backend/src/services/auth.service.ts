import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { comparePassword } from "../utils/password.util.js";
import type { JwtUserPayload } from "../types/express.js";

export class AuthService {
  public async login(uaa_email: string, password: string) {
    const user = await User.findOne({
      where: { uaa_email, is_enabled: true },
    });

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const payload: JwtUserPayload = {
      id: user.id,
      uaa_email: user.uaa_email,
      is_driver: Boolean(user.is_driver),
    };

    const secret = process.env.JWT_SECRET || "uaaventon_dev_secret_key";
    const token = jwt.sign(payload, secret, { expiresIn: "24h" });

    return {
      token,
      user: payload,
    };
  }
}