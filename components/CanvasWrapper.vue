<template>
	<canvas />
</template>

<script>
let raf
export default {
	name: 'CanvasWrapper',
	props: {
		init: { type: Function, default: function() {} },
		render: { type: Function, default: function() {} },
		once: { type: Boolean, default: false },
	},
	data() {
		return {
			width: 0,
			height: 0,
		}
	},
	computed: {},
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
			cancelAnimationFrame(raf)
			this.width = this.$el.width = this.$el.offsetWidth
			this.height = this.$el.height = this.$el.offsetHeight
			const ctx = this.$el.getContext('2d')
			this.init(ctx)
			const wrapped = () => {
				this.render(ctx)
				if (!this.once) {
					raf = requestAnimationFrame(wrapped)
				}
			}
			wrapped()
		},
	},
}
</script>
