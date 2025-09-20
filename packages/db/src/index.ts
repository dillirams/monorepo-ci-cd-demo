import { PrismaClient } from "@prisma/client";
export const prisma=new PrismaClient();
async function main() {
  try {
    // simple query — fetch the current timestamp from database
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("✅ Database connected:", result);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();