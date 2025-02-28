import { PrismaClient } from '@prisma/client';

export const createPrismaDev = async (connectionString: string) => {
	// @ts-ignore
	const { default: PG } = await import('pg');
	const { PrismaPg } = await import('@prisma/adapter-pg');
	const pool = new PG.Pool({
		connectionString
	});
	const adapter = new PrismaPg(pool);
	return new PrismaClient({
		adapter
	});
};
