import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtUserPayload } from "../types/express.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Acceso denegado: Token no proporcionado o inválido." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado: Token no proporcionado." });
  }

  try {
    const secret = process.env.JWT_SECRET || "uaaventon_dev_secret_key";
    const decoded = jwt.verify(token, secret) as JwtUserPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export const requireDriver = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Autenticación requerida." });
  }

  if (!req.user.is_driver) {
    return res.status(403).json({
      message: "Acceso denegado: Se requieren privilegios de conductor.",
    });
  }

  next();
};