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

//   await prisma.user.upsert({
//     where: { email: "admin@acme.test" },
//     update: {},
//     create: {
//       email: "admin@acme.test",
//       password,
//       role: "ADMIN",
//       tenantId: acme.id,
//     },
//   });

//   await prisma.user.upsert({
//     where: { email: "user@acme.test" },
//     update: {},
//     create: {
//       email: "user@acme.test",
//       password,
//       role: "MEMBER",
//       tenantId: acme.id,
//     },
//   });

//   await prisma.user.upsert({
//     where: { email: "admin@globex.test" },
//     update: {},
//     create: {
//       email: "admin@globex.test",
//       password,
//       role: "ADMIN",
//       tenantId: globex.id,
//     },
//   });

//   await prisma.user.upsert({
//     where: { email: "user@globex.test" },
//     update: {},
//     create: {
//       email: "user@globex.test",
//       password,
//       role: "MEMBER",
//       tenantId: globex.id,
//     },
//   });

//   console.log("✅ Seed complete!");
// }

// main()
//   .catch((e) => {
//     console.error("❌ Seed failed", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);

  const acme = await prisma.tenant.upsert({
    where: { slug: "acme" },
    update: {}, // keep existing
    create: { name: "Acme", slug: "acme", plan: "PRO" },
  });

  const globex = await prisma.tenant.upsert({
    where: { slug: "globex" },
    update: {}, // keep existing
    create: { name: "Globex", slug: "globex", plan: "PRO" },
  });

  //  NEW Free tenant for testing upgrades
  const initech = await prisma.tenant.upsert({
    where: { slug: "initech" },
    update: { plan: "FREE" }, // always ensure FREE
    create: { name: "Initech", slug: "initech", plan: "FREE" },
  });

  // Users for Acme
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

  // Users for Globex
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

  // Users for Initech (FREE plan test)
  await prisma.user.upsert({
    where: { email: "admin@initech.test" },
    update: {},
    create: {
      email: "admin@initech.test",
      password,
      role: "ADMIN",
      tenantId: initech.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@initech.test" },
    update: {},
    create: {
      email: "user@initech.test",
      password,
      role: "MEMBER",
      tenantId: initech.id,
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
