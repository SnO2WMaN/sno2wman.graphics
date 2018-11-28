<template>
	<div class="wrapper">
		<GlobalNav class="globalnav" />
		<nuxt class="nuxt" />
	</div>
</template>

<script>
import GlobalNav from '~/components/globalnav/GlobalNav'

export default {
	components: { GlobalNav },
}
</script>

<style lang="scss" scoped>
.wrapper {
	border: $outframe-width $text solid;
	background: #efefef;
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow-x: hidden;
	& > .nuxt {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			width: 0.3rem;
		}
		&::-webkit-scrollbar-button {
			display: none;
		}
		&::-webkit-scrollbar-track {
			background: rgba(black, 0.25);
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(white, 0.25);
		}
	}
}
</style>
