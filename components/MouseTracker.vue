<template>
	<div class="mousetracker" />
</template>

<script>
import { throttle } from 'underscore'

export default {
	name: 'MouseTracker',
	mounted() {
		window.addEventListener(
			'mousemove',
			throttle(e => {
				const x = e.clientX,
					y = e.clientY
				const w = window.innerWidth,
					h = window.innerHeight
				this.$el.style.transform = `translateX(${x}px) 
			translateY(${y}px)`
				this.$emit('move', (x * 2) / w - 1, (y * 2) / h - 1)
			}, 1000 / 30)
		)
	},
}
</script>

<style lang="scss" scoped>
.mousetracker {
	$size: 5vmin;

	position: fixed;
	size: $size;
	border-radius: 50%;
	background: rgba(black, 0.125);
	border: ($size / 10) rgba(white, 0.125) solid;
	top: -($size / 2);
	left: -($size / 2);
	transition: 0.1s transform ease-out;
	z-index: 1;

	@media screen and (max-width: $mobile) {
		display: none;
	}
}
</style>
