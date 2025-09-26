import { Request, Response } from "express";
import { loginService } from "../services/auth.service";

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
