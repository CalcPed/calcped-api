import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const medicinesRepository = prisma.medicine;
const allergiessRepository = prisma.allergy;

export default prisma;
export { medicinesRepository, allergiessRepository };
