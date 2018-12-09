<template>
	<div class="link"><slot /></div>
</template>

<script>
import Clipboard from 'clipboard'

let clipboard

export default {
	name: 'Clipboard',
	props: {
		text: { type: String, default: '' },
	},
	mounted() {
		clipboard = new Clipboard(this.$el, { text: () => this.text })
	},
	beforeDestroy() {
		clipboard.destroy()
	},
}
</script>
