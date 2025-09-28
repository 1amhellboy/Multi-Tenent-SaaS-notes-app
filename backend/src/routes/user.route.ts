import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import prisma from "../prisma";

const router = Router();

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { tenant: true }, 
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("❌ /me error", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default router;
