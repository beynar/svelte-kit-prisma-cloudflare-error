<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-800">Blog</h1>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<a href={`/posts/${post.id}`} class="block">
				<article
					class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
				>
					{#if post.image}
						<img src={post.image} alt={post.title} class="h-48 w-full object-cover" />
					{/if}
					<div class="p-5">
						<h2 class="mb-2 text-xl font-semibold text-gray-800">{post.title}</h2>
						{#if post.description}
							<p class="mb-4 line-clamp-3 text-gray-600">{post.description}</p>
						{/if}
						<div class="flex items-center justify-between text-sm text-gray-500">
							{#if post.author}
								<span class="flex items-center">
									{#if post.author.avatar}
										<img
											src={post.author.avatar}
											alt={post.author.name}
											class="mr-2 h-6 w-6 rounded-full"
										/>
									{/if}
									{post.author.name}
								</span>
							{/if}
							<time datetime={post.createdAt.toISOString()}>
								{new Date(post.createdAt).toLocaleDateString()}
							</time>
						</div>
					</div>
				</article>
			</a>
		{/each}
	</div>

	{#if data.posts.length === 0}
		<div class="py-12 text-center">
			<p class="text-gray-600">No posts found. Check back soon!</p>
		</div>
	{/if}
</div>
