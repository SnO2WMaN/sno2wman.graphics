<template>
	<canvas />
</template>

<script>
import { throttle } from 'underscore'

let raf, throttled
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
		throttled = throttle(this.fit, 1000 / 30)
		this.$nextTick(this.fit)
		window.addEventListener('resize', throttled)
	},
	beforeDestroy() {
		window.removeEventListener('resize', throttled)
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
