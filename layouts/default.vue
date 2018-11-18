<template>
	<div class="wrapper">
		<GlobalNav class="globalnav" />
		<nuxt class="nuxt" />
	</div>
</template>

<script>
import GlobalNav from '~/components/GlobalNav'

export default {
	components: { GlobalNav },
}
</script>

<style lang="scss" scoped>
.wrapper {
	border: 1rem #3f3f3f solid;
	background: #efefef;
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
	& > .nuxt {
		width: 100%;
		height: 100%;
	}
}
</style>
