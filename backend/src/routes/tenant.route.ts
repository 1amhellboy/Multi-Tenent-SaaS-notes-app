import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upgradeTenantController } from "../controllers/tenant.controller";

const router = Router();

router.post("/:slug/upgrade", authMiddleware, upgradeTenantController);

export default router;
