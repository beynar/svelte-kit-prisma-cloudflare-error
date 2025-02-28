import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
	console.log('Starting seed...');

	// Create 3 users (authors)
	const user1 = await prisma.user.upsert({
		where: { email: 'author1@example.com' },
		update: {},
		create: {
			email: 'author1@example.com',
			password: 'fakepassword123',
			name: 'Emma Johnson',
			avatar: 'https://i.pravatar.cc/150?img=1'
		}
	});

	const user2 = await prisma.user.upsert({
		where: { email: 'author2@example.com' },
		update: {},
		create: {
			email: 'author2@example.com',
			password: 'fakepassword123',
			name: 'Liam Smith',
			avatar: 'https://i.pravatar.cc/150?img=2'
		}
	});

	const user3 = await prisma.user.upsert({
		where: { email: 'author3@example.com' },
		update: {},
		create: {
			email: 'author3@example.com',
			password: 'fakepassword123',
			name: 'Olivia Williams',
			avatar: 'https://i.pravatar.cc/150?img=3'
		}
	});

	// Store user IDs for creating posts later
	const users = [user1, user2, user3];
	console.log('Users created:', [user1.email, user2.email, user3.email]);

	// Create 5 posts for each user ID
	for (let i = 0; i < users.length; i++) {
		const user = users[i];

		for (let j = 1; j <= 5; j++) {
			const post = await prisma.post.create({
				data: {
					title: `Post ${j} by ${user.name}`,
					content: `This is the content of post ${j} written by ${user.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
					description: `Description for post ${j}`,
					authorId: user.id,
					image: 'https://picsum.photos/1000/600'
				}
			});

			console.log(`Created post: ${post.title}`);

			// Create 3 comments on each post (one from each user)
			for (let k = 0; k < users.length; k++) {
				const commentAuthorId = users[k].id;
				const commentAuthorName = users[k].name;

				const comment = await prisma.comment.create({
					data: {
						content: `Comment by ${commentAuthorName} on post "${post.title}". Lorem ipsum dolor sit amet.`,
						authorId: commentAuthorId,
						postId: post.id
					}
				});

				console.log(`Created comment by ${commentAuthorName} on post ${post.id}`);
			}
		}
	}
})();
