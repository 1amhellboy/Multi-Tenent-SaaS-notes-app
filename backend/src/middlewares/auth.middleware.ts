import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { isBlacklisted } from "../utils/tokenBlacklist";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    tenantId: string;
    tenant?: any;
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({ message: "Token has been revoked" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      tenantId: decoded.tenantId,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
