// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// async function main() {
//   const password = await bcrypt.hash("password", 10);

//   const acme = await prisma.tenant.upsert({
//     where: { slug: "acme" },
//     update: {},
//     create: { name: "Acme", slug: "acme", plan: "FREE" },
//   });

//   const globex = await prisma.tenant.upsert({
//     where: { slug: "globex" },
//     update: {},
//     create: { name: "Globex", slug: "globex", plan: "FREE" },
//   });

//   await prisma.user.createMany({
//     data: [
//       { email: "admin@acme.test", password, role: "ADMIN", tenantId: acme.id },
//       { email: "user@acme.test", password, role: "MEMBER", tenantId: acme.id },
//       { email: "admin@globex.test", password, role: "ADMIN", tenantId: globex.id },
//       { email: "user@globex.test", password, role: "MEMBER", tenantId: globex.id },
//     ],
//     skipDuplicates: true,
//   });

//   console.log(" Seed complete!");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);

  const acme = await prisma.tenant.upsert({
    where: { slug: "acme" },
    update: {},
    create: { name: "Acme", slug: "acme", plan: "FREE" },
  });

  const globex = await prisma.tenant.upsert({
    where: { slug: "globex" },
    update: {},
    create: { name: "Globex", slug: "globex", plan: "FREE" },
  });

  await prisma.user.upsert({
    where: { email: "admin@acme.test" },
    update: {},
    create: {
      email: "admin@acme.test",
      password,
      role: "ADMIN",
      tenantId: acme.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@acme.test" },
    update: {},
    create: {
      email: "user@acme.test",
      password,
      role: "MEMBER",
      tenantId: acme.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@globex.test" },
    update: {},
    create: {
      email: "admin@globex.test",
      password,
      role: "ADMIN",
      tenantId: globex.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@globex.test" },
    update: {},
    create: {
      email: "user@globex.test",
      password,
      role: "MEMBER",
      tenantId: globex.id,
    },
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

