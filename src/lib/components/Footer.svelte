<script>
	const year = new Date().getFullYear();
</script>

<footer class="legal-footer mt-8 flex w-full flex-col items-center justify-center text-center">
	<div class="legal-footer__inner flex flex-row items-end justify-center px-3 py-3">
		<p class="text-xs tracking-[0.08em] text-zinc-400">
			Marcus Sand &copy; {year} · CVR 43411764 · Hanstholmvej 55, 2. Th., 2720 Vanløse, Denmark
		</p>
	</div>
</footer>

<style lang="scss">
	.legal-footer {
		position: relative;
		isolation: isolate;
	}

	.legal-footer::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(13, 13, 13, 0) 0%,
			rgba(13, 13, 13, 0.86) 32%,
			rgba(13, 13, 13, 0.98) 100%
		);
		z-index: -1;
	}

	.legal-footer__inner {
		width: min(100%, 72rem);
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}
</style>
