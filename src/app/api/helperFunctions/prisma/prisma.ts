// utils/prisma.ts
//../src/app/generated/prisma

import { PrismaClient } from "../../../generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient();
};
declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
