import prisma from "../prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { tenant: true },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
  });

  return { token };
}
