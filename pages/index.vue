<template>
	<article>
		<CanvasWrapper
			:init="background.init"
			:render="background.render"
			:once="background.once"
			class="canvas"
		/>
		<header>
			<div class="image"><img src="~/assets/images/laptop.png" /></div>
			<div class="text">
				<h1>SnO2WMaN</h1>
				<h2>Voxel Stuff / Scary Frontend</h2>
				<h2>Japanese Nerd</h2>
				<div class="button">
					<p>WHOIS</p>
					<nuxt-link to="/profile" class="link" />
				</div>
			</div>
		</header>
	</article>
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
article {
	position: relative;
	size: 100%;
	& > .canvas {
		position: absolute;
		top: 0;
		left: 0;
		size: 100%;
	}
	& > header {
		width: 100%;
		height: 100%;
		position: relative;
		user-select: none;
		& > .image {
			position: absolute;
			top: 0;
			bottom: 0;
			left: (100% / metallic(1));
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 1;
			& > img {
				height: (100vh / 2);
			}
			@media screen and (max-width: $tablet) {
				width: 100%;
				left: 0;
				bottom: 0;
				top: auto;
				& > img {
					height: calc(
						(100vh - #{$outframe-width * 2}) / #{metallic(1) + 1}
					);
				}
			}
		}
		& > .text {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 50%;
			margin: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			z-index: 1;
			& > h1 {
				font-size: 3rem;
				font-family: 'Press Start 2P', monospace;
				color: $text;
				letter-spacing: 0.2rem;
				margin-bottom: 1rem;
			}
			& > h2 {
				font-family: 'Montserrat', sans-serif;
				font-weight: 500;
				color: $text;
				letter-spacing: 0.1rem;
				&:not(:last-of-type) {
					margin-bottom: 0.25rem;
				}
			}
			& > .button {
				position: relative;
				border: 1px solid $text;
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
					opacity: 0.25;
					background: url('~assets/images/stripe_black_11.png');
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
					color: $text;
					letter-spacing: 3px;
				}
			}
			@media screen and (max-width: $tablet) {
				bottom: 0;
				right: 0;
				width: 100%;
				align-items: center;
				padding-bottom: calc((100vh - #{$outframe-width * 2}) / 3);
				& > h1 {
					font-size: 2rem;
					letter-spacing: 0.1rem;
				}
				& > h2 {
					font-size: 0.75rem;
					letter-spacing: 1px;
				}
			}
		}
	}
}
</style>
