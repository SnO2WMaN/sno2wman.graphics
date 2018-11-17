<template>
	<div>
		<header><CanvasWrapper class="canvas" /></header>
	</div>
</template>

<script>
import CanvasWrapper from '~/components/CanvasWrapper'

export default {
	components: {
		CanvasWrapper,
	},
	head() {
		return { title: 'Index' }
	},
}
</script>

<style lang="scss" scoped>
header {
	width: 100%;
	height: 100%;
	position: relative;
	& > .canvas {
		position: absolute;
		top: 0;
		left: 0;
		size: 100%;
	}
}
</style>
