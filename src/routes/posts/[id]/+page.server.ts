import { error } from '@sveltejs/kit';

export const load = async ({ locals, params, depends }) => {
	depends('post');

	const [posts, post] = await Promise.all([
		locals.prisma.post.findMany({
			include: {
				author: true
			}
		}),

		locals.prisma.post.findUnique({
			where: {
				id: params.id
			},
			include: {
				comments: true,
				author: true
			}
		})
	]);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const nextRandomPost = posts[Math.floor(Math.random() * posts.length)];
	return { post, posts, nextPost: nextRandomPost };
};
