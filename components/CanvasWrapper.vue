<template>
	<canvas />
</template>

<script>
export default {
	name: 'CanvasWrapper',
	mounted() {
		this.$nextTick(() => {
			this.fit()
		})
		window.addEventListener('resize', this.fit)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.fit)
	},
	methods: {
		fit() {
			this.$el.width = this.$el.offsetWidth
			this.$el.height = this.$el.offsetHeight
		},
	},
}
</script>
