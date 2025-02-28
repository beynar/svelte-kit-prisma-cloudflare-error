import { Pool } from '@prisma/pg-worker';
import { PrismaPg } from '@prisma/adapter-pg-worker';
import { type Prisma as P, PrismaClient } from '@prisma/client';
import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PRIVATE_DATABASE_URL } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const createPrisma = (connectionString: string, cb?: (end: () => Promise<void>) => void) => {
		const pool = new Pool({
			connectionString,
			max: 1,
			allowExitOnIdle: true,
			idleTimeoutMillis: 0
		});
		const adapter = new PrismaPg(pool);
		const prisma = new PrismaClient({
			adapter
		} as P.PrismaClientOptions);

		event.platform?.context.waitUntil(
			new Promise((resolve) => {
				console.log('wait until');
				try {
					pool.end().then(() => {
						resolve(true);
					});
				} catch (error) {
					resolve(true);
				}
			})
		);

		return prisma;
	};

	const prisma =
		dev || !event.platform?.env.HYPERDRIVE
			? await import('./prismaDev').then((m) => m.createPrismaDev(PRIVATE_DATABASE_URL))
			: await createPrisma(event.platform?.env.HYPERDRIVE?.connectionString);
	Object.assign(event.locals, { prisma });

	return resolve(event);
};
