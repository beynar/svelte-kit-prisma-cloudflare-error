<script lang="ts">
	let { data } = $props();
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
