<template>
	<section>
		<div :style="{ transform: numberTransform }" class="number">
			<span>0</span><span>{{ number }} </span>
		</div>
		<div :style="{ transform: typeTransform }" class="type">
			<p
				v-for="n in 2"
				:class="{ real: n == 1, shadow: n == 2 }"
				:key="n"
			>
				<span v-for="(char, i) in theme.toUpperCase()" :key="i">{{
					char
				}}</span>
			</p>
		</div>
		<div :style="{ transform: sliderTransform }" class="slider">
			<p class="text">
				<span>{{ visibleImage + 1 }}</span
				>/<span>{{ Object.keys(images).length }}</span>
			</p>
			<div class="buttons">
				<div
					v-for="n in Object.keys(images).length"
					:key="n"
					:class="{
						button: true,
						selected: visibleImage == n - 1,
					}"
					@click="visibleImage = n - 1"
				/>
			</div>
		</div>
		<div :style="{ transform: textsTransform }" class="texts">
			<h1 v-for="(title, i) in titles" :key="`title-${i}`">
				{{ title }}
			</h1>
			<h3 v-for="(subtitle, i) in subtitles" :key="`subtitles-${i}`">
				{{ subtitle }}
			</h3>
			<div class="button">
				<p>{{ button }}</p>
			</div>
		</div>
		<transition-group
			:style="{ transform: imagesTransform }"
			name="motionimage"
			class="images"
		>
			<MotionImage
				v-for="(src, title, i) in images"
				v-if="visibleImage === i"
				:key="`image-${i}`"
				:src="src"
				:title="title"
				:class="{ image: true }"
			/>
		</transition-group>
		<transition>
			<img
				:style="{ transform: meTransform }"
				:src="require(`@/assets/images/me/${me}.png`)"
				class="me"
			/>
		</transition>
	</section>
</template>

<script>
import MotionImage from '~/components/Index/MotionImage'

export default {
	name: 'HeaderSection',
	components: {
		MotionImage,
	},
	props: {
		mouseX: { type: Number, default: 0 },
		mouseY: { type: Number, default: 0 },
		number: { type: Number, default: 0 },
		theme: { type: String, default: '' },
		titles: { type: Array, default: new Array() },
		subtitles: { type: Array, default: new Array() },
		button: { type: String, default: 'Button' },
		me: { type: String, default: 'standing' },
		images: { type: Object, default: new Object() },
	},
	data() {
		return {
			visibleImage: 0,
		}
	},
	computed: {
		imagesTransform() {
			const move = 3
			const func = n => n
			return this.translate(
				func(this.mouseX) * move,
				func(this.mouseY) * move
			)
		},
		numberTransform() {
			const move = 6
			const func = n => n
			return this.translate(
				func(this.mouseX) * move,
				func(this.mouseY) * move
			)
		},
		typeTransform() {
			return this.numberTransform
		},
		sliderTransform() {
			return this.numberTransform
		},
		textsTransform() {
			const move = 40
			const func = n => n
			return this.translate(
				func(this.mouseX) * move,
				func(this.mouseY) * move
			)
		},
		meTransform() {
			const move = 15
			const func = n => n
			return this.translate(
				func(this.mouseX) * move,
				func(this.mouseY) * move
			)
		},
	},
	mounted() {
		setInterval(() => {
			this.visibleImage++
			this.visibleImage %= Object.keys(this.images).length
		}, 7500)
	},
	methods: {
		translate(x, y) {
			return `translateX(${x}px) translateY(${y}px)`
		},
	},
}
</script>
<style lang="scss" scoped>
section {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	user-select: none;
	& > .number {
		position: absolute;
		top: 10%;
		left: 5%;
		& > span {
			color: white;
			font-family: 'Press Start 2P', sans-serif;
			line-height: 1em;
			font-size: 4rem;
			letter-spacing: 0.5rem;
		}
	}
	& > .type {
		position: absolute;
		bottom: 10%;
		left: 5%;
		& > .real,
		& > .shadow {
			font-family: 'Press Start 2P', sans-serif;
			line-height: 1em;
			font-size: 2rem;
			letter-spacing: 0.5rem;
		}
		& > .real {
			color: white;
		}
		& > .shadow {
			position: absolute;
			top: 0;
			color: blue;
			transform: translateY(100%);
		}
	}
	& > .slider {
		position: absolute;
		left: 50%;
		bottom: 10%;
		display: flex;
		align-items: center;
		z-index: 2;
		& > p {
			color: white;
			font-family: 'Press Start 2P', sans-serif;
			line-height: 1em;
			font-size: 2rem;
			letter-spacing: 0.5rem;
		}
		& > .buttons {
			margin-left: 2rem;
			display: flex;
			& > .button {
				background-color: transparent;
				border: 1px solid white;
				size: 1.2rem;
				border-radius: 50%;
				&.selected {
					background-color: white;
				}
				&:not(.selected) {
					cursor: pointer;
					&:hover {
						background-color: rgba(white, 0.125);
					}
				}
				&:not(:last-of-type) {
					margin-right: 1.25rem;
				}
			}
		}
	}
	& > .texts {
		position: absolute;
		top: 0;
		left: 5%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		z-index: 2;
		& > h1 {
			font-size: 4rem;
			letter-spacing: 0.5rem;
			font-family: 'Press Start 2P', sans-serif;
			color: white;
			line-height: 1em;
			&:last-of-type {
				margin-bottom: 2rem;
			}
		}
		& > h3 {
			font-weight: 300;
			color: white;
			font-family: 'Josefin Sans', sans-serif;
			font-size: 1.25rem;
			line-height: 1em;
			letter-spacing: 0.05rem;
		}
		& > .button {
			border: solid 1px;
			padding: 0.75rem (0.75rem * metallic(1));
			margin-top: 2rem;
			position: relative;
			background-color: rgba(white, 0.1);
			border-color: rgba(white, 0.5);
			overflow: hidden;
			cursor: pointer;
			&:after {
				$size: 11;
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: calc(100% + #{$size * 1px});
				background-image: url('~assets/images/stripe_'+$size+'_white.png');
				background-repeat: repeat;
				opacity: 0.125;
				animation: 0.75s linear infinite translate-y-0-#{$size};
				@keyframes translate-y-0-11 {
					from {
						transform: translateY(0%);
					}
					100% {
						transform: translateY($size * 1px);
					}
				}
			}
			& > p {
				color: white;
				font-size: 1rem;
				font-family: 'Josefin Sans', monospace;
				letter-spacing: 0.2rem;
				font-weight: 300;
				line-height: 1em;
			}
		}
	}
	@media screen and (max-width: $widescreen) {
		& > .number,
		& > .texts,
		& > .type {
			left: 5%;
		}
	}
	& > .images {
		position: absolute 0;
		size: (100% / metallic(1));
		margin: auto;
		z-index: -1;
		& > .image {
			size: 100%;
		}
	}
	& > .me {
		position: absolute;
		height: 125%;
		right: 5%;
		top: 10%;
		pointer-events: none;
		transform: translateY(100%);
	}
}
</style>
