import { Request, Response } from "express";
import { loginService } from "../services/auth.service";
import { addToBlacklist } from "../utils/tokenBlacklist";

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const result = await loginService(email, password);
    return res.json(result);
  } catch (err: any) {
    if (err.message === "Invalid credentials") {
      return res.status(401).json({ message: err.message });
    }
    console.error("Login error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(200).json({ message: "Logged out" });
    const token = authHeader.split(" ")[1];
    if (token) addToBlacklist(token);
    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Failed to logout" });
  }
}
