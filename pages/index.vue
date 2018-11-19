<template>
	<div>
		<header>
			<CanvasWrapper
				:init="background.init"
				:render="background.render"
				:once="background.once"
				class="canvas"
			/>
		</header>
	</div>
</template>

<script>
import background from '~/exports/header.js'

import CanvasWrapper from '~/components/CanvasWrapper'

export default {
	components: {
		CanvasWrapper,
	},
	head() {
		return { title: 'Index' }
	},
	data() {
		return {
			background,
		}
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
