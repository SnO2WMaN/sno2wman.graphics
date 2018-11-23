<template>
	<article>
		<CanvasWrapper
			:init="background.init"
			:render="background.render"
			:once="background.once"
			class="canvas"
		/>
		<div class="status">
			<p>Status:</p>
			<span>{{ error.statusCode }}</span>
		</div>
		<div class="message">
			<p>{{ error.message }}</p>
		</div>
		<div class="button">
			<p>BACK</p>
			<nuxt-link to="/" class="link" />
		</div>
	</article>
</template>

<script>
import background from '~/exports/404.js'
import CanvasWrapper from '~/components/CanvasWrapper'

export default {
	name: 'NuxtError',
	components: {
		CanvasWrapper,
	},
	props: {
		error: {
			type: Object,
			default: null,
		},
	},
	data() {
		return { background }
	},
	head() {
		return {
			title: this.message,
		}
	},
	computed: {
		statusCode() {
			return (this.error && this.error.statusCode) || 500
		},
		message() {
			return this.error.message || `<%= messages.client_error %>`
		},
	},
}
</script>

<style lang="scss" scoped>
article {
	position: relative;
	size: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #0f0f0f;
	user-select: none;
	& > .canvas {
		position: absolute;
		top: 0;
		left: 0;
		size: 100%;
	}
	& > .status {
		display: flex;
		align-items: flex-end;
		margin-bottom: 1rem;
		position: relative;
		z-index: 1;
		& > p {
			font-family: 'Press Start 2P', monospace;
			color: white;
			margin-right: 0.5rem;
		}
		& > span {
			font-size: 2rem;
			font-family: 'Press Start 2P', monospace;
			color: #0f0;
			letter-spacing: 0.1rem;
		}
	}
	& > .message {
		position: relative;
		z-index: 1;
		& > p {
			font-size: 0.8rem;
			font-family: 'Press Start 2P', monospace;
			color: white;
			text-align: center;
		}
		@media screen and (max-width: $tablet) {
			padding: 0 calc((100vw - #{$outframe-width * 2}) / 12);
		}
	}
	& > .button {
		position: relative;
		border: 1px solid white;
		padding: 0.75rem 1.5rem;
		margin-top: 2rem;
		overflow: hidden;
		&:before {
			content: '';
			position: absolute;
			width: 100%;
			height: calc(100% + 11px);
			top: 0;
			left: 0;
			opacity: 0.5;
			background: url('~assets/images/stripe_white_11.png');
			animation: button 0.75s infinite linear;
			@keyframes button {
				from {
					transform: translateY(0);
				}
				to {
					transform: translateY(-11px);
				}
			}
		}
		& > .link {
			position: absolute;
			size: 100%;
			z-index: 2;
			top: 0;
			left: 0;
		}
		& > p {
			font-size: 0.8rem;
			font-family: 'Press Start 2P', monospace;
			color: white;
			letter-spacing: 3px;
		}
	}
}
</style>
