import prisma from "../prisma";

export async function upgradeTenantPlanService(slug: string) {
  return prisma.tenant.update({
    where: { slug },
    data: { plan: "PRO" },
  });
}
