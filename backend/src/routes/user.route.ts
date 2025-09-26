import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  console.log("✅ User routes loaded");
  res.json({ user: req.user });
});

export default router;
