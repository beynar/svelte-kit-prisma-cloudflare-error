// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			prisma: import('@prisma/client').PrismaClient;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			cache: import('@cloudflare/workers-types').CacheStorage;
			env: {
				HYPERDRIVE?: import('@cloudflare/workers-types').Hyperdrive;
			};
			context: import('@cloudflare/workers-types').ExecutionContext;
		}
	}
}

export {};
