import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const post = await locals.prisma.post.findUnique({
		where: {
			id: params.id
		},
		include: {
			comments: true,
			author: true
		}
	});

	if (!post) {
		throw error(404, 'Post not found');
	}
	return { post };
};
