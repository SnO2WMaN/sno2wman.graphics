<template>
	<div :class="{ active: active }" class="hamburger" @click="clicked">
		<div class="bars">
			<div class="bar" />
			<div class="bar" />
			<div class="bar" />
			<div class="bar" />
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons'

export default {
	name: 'Hamburger',
	components: {
		FontAwesomeIcon,
	},
	data() {
		return {
			icon: faBars,
			active: false,
		}
	},
	methods: {
		clicked() {
			this.active = !this.active
			this.$emit('clicked')
		},
	},
}
</script>

<style lang="scss" scoped>
.hamburger {
	display: flex;
	justify-content: center;
	align-items: center;
	& > .bars {
		width: (100% / metallic(2));
		height: (100% / metallic(2) / sqrt(2));
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		position: relative;
		& > .bar {
			width: 100%;
			height: 2px;
			background-color: #3f3f3f;
			transition: 0.4s transform $easeInOutCubic;
			&:nth-of-type(1) {
				transform-origin: 50% - (50% / sqrt(2));
			}
			&:nth-of-type(2) {
				transform-origin: 50% + (50% / sqrt(2));
			}
			&:nth-of-type(3),
			&:nth-of-type(4) {
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto 0;
			}
		}
	}
	&.active {
		& > .bars {
			& > .bar {
				&:nth-of-type(1),
				&:nth-of-type(2) {
					transform: scaleX(0);
				}
				&:nth-of-type(3),
				&:nth-of-type(4) {
					transition-delay: (0.4s / 2);
				}
				&:nth-of-type(3) {
					transform: rotateZ(45deg);
				}
				&:nth-of-type(4) {
					transform: rotateZ(-45deg);
				}
			}
		}
	}
}
</style>
