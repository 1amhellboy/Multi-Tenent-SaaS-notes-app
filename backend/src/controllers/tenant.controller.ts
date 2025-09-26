import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { upgradeTenantPlanService } from "../services/tenant.service";

export async function upgradeTenantController(req: AuthRequest, res: Response) {
  try {
    // Only Admins can upgrade
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    const { slug } = req.params;
    const tenant = await upgradeTenantPlanService(slug);

    res.json({ message: "Tenant upgraded to PRO", tenant });
  } catch (err) {
    console.error("Upgrade error:", err);
    res.status(500).json({ message: "Failed to upgrade tenant" });
  }
}
