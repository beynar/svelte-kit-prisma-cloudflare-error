<script lang="ts">
	let { data } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-12">
		<header class="mb-12 text-center">
			<h1 class="mb-3 text-4xl font-bold text-gray-900">Our Blog</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Discover the latest insights, tutorials, and updates from our team
			</p>
		</header>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post}
				<a
					href={`/posts/${post.id}`}
					class="group block h-full transform transition duration-300 hover:-translate-y-1"
				>
					<article
						class="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
					>
						{#if post.image}
							<div class="overflow-hidden">
								<img
									src={post.image}
									alt={post.title}
									class="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
						{:else}
							<div class="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
						{/if}
						<div class="flex flex-1 flex-col p-6">
							<h2 class="mb-3 text-xl font-semibold text-gray-800 group-hover:text-blue-600">
								{post.title}
							</h2>
							{#if post.description}
								<p class="mb-5 line-clamp-3 flex-1 text-gray-600">{post.description}</p>
							{/if}
							<div
								class="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm"
							>
								{#if post.author}
									<span class="flex items-center">
										{#if post.author.avatar}
											<img
												src={post.author.avatar}
												alt={post.author.name}
												class="mr-2 h-7 w-7 rounded-full border border-gray-200"
											/>
										{:else}
											<div
												class="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600"
											>
												{post.author?.name?.charAt(0) || '?'}
											</div>
										{/if}
										<span class="font-medium text-gray-700">{post.author?.name || 'Anonymous'}</span
										>
									</span>
								{/if}
								<time
									datetime={post.createdAt.toISOString()}
									class="flex items-center text-gray-500"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-1 h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									{new Date(post.createdAt).toLocaleDateString()}
								</time>
							</div>
						</div>
					</article>
				</a>
			{/each}
		</div>

		{#if data.posts.length === 0}
			<div
				class="my-24 flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mb-4 h-16 w-16 text-gray-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5v2m0 0l5 5m-5-5v5"
					/>
				</svg>
				<h2 class="mb-2 text-2xl font-bold text-gray-700">No posts found</h2>
				<p class="text-gray-600">We're working on new content. Please check back soon!</p>
			</div>
		{/if}
	</div>
</div>
