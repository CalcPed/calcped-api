import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const medicinesRepository = prisma.medicines;
const alergiessRepository = prisma.alergiess;

export default prisma;
export { medicinesRepository, alergiessRepository };
