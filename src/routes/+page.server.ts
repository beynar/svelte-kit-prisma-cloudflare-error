export const load = async ({ locals }) => {
	const posts = await locals.prisma.post.findMany({
		include: {
			author: true
		}
	});
	return { posts };
};
