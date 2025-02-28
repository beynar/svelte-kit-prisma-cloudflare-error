<script lang="ts">
	import { goto } from '$app/navigation';

	let { data } = $props();

	const nextPost = $derived(data.nextPost);
	const threeRandomPosts = $derived([
		data.posts[Math.floor(Math.random() * data.posts.length)],
		data.posts[Math.floor(Math.random() * data.posts.length)],
		data.posts[Math.floor(Math.random() * data.posts.length)]
	]);
</script>

<div class="container mx-auto max-w-3xl px-4 py-8">
	{#if data.post}
		<h1 class="mb-4 text-4xl font-bold text-gray-800">{data.post.title}</h1>

		<div class="mb-6 flex items-center text-gray-600">
			<div class="mr-4">
				<span class="text-sm">{new Date(data.post.createdAt).toLocaleDateString()}</span>
			</div>
			{#if data.post.author}
				<div class="flex items-center">
					<span class="text-sm">By {data.post.author.name || 'Anonymous'}</span>
				</div>
			{/if}
		</div>

		{#if data.post.image}
			<img
				src={data.post.image}
				alt={data.post.title}
				class="mb-8 h-64 w-full rounded-lg object-cover"
			/>
		{/if}

		<div class="prose prose-lg max-w-none">
			{@html data.post.content}
		</div>

		<!-- Next Post Button -->
		{#if nextPost}
			<div class="mt-12 border-t border-gray-200 pt-8">
				<h3 class="mb-4 text-xl font-semibold text-gray-800">Continue Reading</h3>
				<button
					onclick={() => {
						goto(`/posts/${nextPost.id}`);
						invalidate('post');
					}}
					class="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
				>
					<div>
						<h4 class="font-medium text-gray-800">{nextPost.title}</h4>
						{#if nextPost.excerpt}
							<p class="mt-1 text-sm text-gray-600">{nextPost.excerpt}</p>
						{/if}
					</div>
					<span class="text-blue-600">→</span>
				</button>
			</div>
		{/if}

		<!-- Random Posts -->
		<div class="mt-12 border-t border-gray-200 pt-8">
			<h3 class="mb-6 text-xl font-semibold text-gray-800">You might also like</h3>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each threeRandomPosts as post}
					{#if post && post.id !== data.post.id}
						<button
							onclick={() => {
								goto(`/posts/${post.id}`);
								invalidate('post');
							}}
							class="group"
						>
							<div
								class="overflow-hidden rounded-lg border border-gray-200 transition group-hover:shadow-md"
							>
								{#if post.image}
									<img src={post.image} alt={post.title} class="h-40 w-full object-cover" />
								{:else}
									<div class="h-40 w-full bg-gray-100"></div>
								{/if}
								<div class="p-4">
									<h4 class="font-medium text-gray-800 group-hover:text-blue-600">{post.title}</h4>
									{#if post.excerpt}
										<p class="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
									{/if}
									<div class="mt-2 text-xs text-gray-500">
										{new Date(post.createdAt).toLocaleDateString()}
									</div>
								</div>
							</div>
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{:else}
		<div class="py-12 text-center">
			<h2 class="text-2xl font-semibold text-gray-700">Post not found</h2>
			<p class="mt-2 text-gray-600">
				The post you're looking for doesn't exist or has been removed.
			</p>
			<a
				href="/"
				class="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
			>
				Back to Home
			</a>
		</div>
	{/if}
</div>
