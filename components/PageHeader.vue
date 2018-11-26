<template>
	<header>
		<h1 class="title">{{ title }}</h1>
		<h2 class="subtitle">{{ subtitle }}</h2>
		<div v-if="0 < texts.length" class="texts">
			<p v-for="(text, i) in texts" :key="i">{{ text }}</p>
		</div>
	</header>
</template>

<script>
export default {
	name: 'PageHeader',
	props: {
		title: {
			type: String,
			default: '',
		},
		subtitle: {
			type: String,
			default: '',
		},
		texts: {
			type: Array,
			default: () => [],
		},
	},
}
</script>

<style lang="scss" scoped>
header {
	padding-top: calc((100vh - #{$outframe-width * 2}) / 5);
	margin-bottom: calc((100vh - #{$outframe-width * 2}) / 10);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: $tablet) {
		padding-left: calc((100vw - #{$outframe-width * 2}) / 6);
		padding-right: calc((100vw - #{$outframe-width * 2}) / 6);
	}
	& > .title {
		font-size: 2.5rem;
		color: $text;
		font-family: 'Press Start 2P', sans-serif;
		letter-spacing: 0.5rem;
		margin-bottom: 1rem;
		user-select: none;
		@media screen and (max-width: $tablet) {
			font-size: 1.75rem;
			letter-spacing: 0.125rem;
		}
	}
	& > .subtitle {
		font-size: 1rem;
		color: $text;
		font-family: 'Noto Sans JP', sans-serif;
		letter-spacing: 0.1rem;
		user-select: none;
		@media screen and (max-width: $tablet) {
			font-size: 0.9rem;
			letter-spacing: 1px;
		}
	}
	& > .texts {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1rem;
		& > p {
			font-size: 0.85rem;
			color: $text;
			font-family: 'Noto Sans JP', sans-serif;
			letter-spacing: 1px;
			line-height: 1.1em;
			&:not(:last-of-type) {
				margin-bottom: 0.5rem;
			}
			@media screen and (max-width: $tablet) {
				font-size: 0.75rem;
				letter-spacing: 1px;
			}
		}
	}
}
</style>
