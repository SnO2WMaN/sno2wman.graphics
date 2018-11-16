<template>
	<div class="image">
		<div class="covers">
			<div class="cover" />
			<div class="cover" />
		</div>
		<p class="title">
			<span v-for="(char, i) in title" :key="i">{{ char }}</span>
		</p>
		<img :src="src" />
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, default: '' },
		src: { type: String, default: '' },
	},
}
</script>

<style lang="scss" scoped>
.image {
	position: relative;
	& > img {
		pointer-events: none;
		size: 100%;
		object-fit: cover;
	}
	& > .title {
		position: absolute;
		font-size: 1.2rem;
		color: rgba(white, 0.75);
		font-family: 'Press Start 2P', sans-serif;
		letter-spacing: 0.1rem;
		bottom: 5%;
		left: 5%;
		overflow: hidden;
		z-index: 2;
		& > span {
			display: inline-block;
			transform: translateY(110%);
		}
	}
	& > .covers {
		position: absolute;
		left: 0;
		top: 0;
		size: 100%;
		& > .cover {
			position: absolute;
			left: 0;
			top: 0;
			size: 100%;
			transform: scaleX(0);
			transform-origin: left;
			&:nth-of-type(1) {
				background: blue;
			}
			&:nth-of-type(2) {
				background: #00b;
			}
		}
	}
}
</style>
