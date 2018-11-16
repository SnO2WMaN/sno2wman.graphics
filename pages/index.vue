<template>
	<div>
		<MouseTracker @move="mouseTrack" />
		<header>
			<div class="bg" />
			<div class="mousetracker" />
			<div class="sections">
				<HeaderSection
					v-for="(section, i) in sections"
					:key="`section-${i}`"
					:mouse-x="mouseX"
					:mouse-y="mouseY"
					:number="i + 1"
					:theme="section.theme"
					:titles="section.titles"
					:subtitles="section.subtitles"
					:me="section.me"
					:button="section.button"
					:images="section.images"
				/>
			</div>
		</header>
	</div>
</template>

<script>
import MouseTracker from '~/components/MouseTracker'

import HeaderSection from '~/components/index/HeaderSection'

export default {
	components: {
		MouseTracker,
		HeaderSection,
	},
	head() {
		return { title: 'Index' }
	},
	data: function() {
		return {
			mouseX: 0,
			mouseY: 0,
			sections: [
				{
					theme: 'voxel',
					titles: ['export();'],
					subtitles: ['Make voxel things with #MagicaVoxel'],
					me: 'standing',
					button: 'More Exports',
					images: {
						Laboratori: require('@/assets/images/header4.png'),
						Citythings: require('@/assets/images/header1.png'),
						Komputa: require('@/assets/images/header5.png'),
					},
				},
			],
		}
	},
	methods: {
		mouseTrack(x, y) {
			this.mouseX = x
			this.mouseY = y
		},
	},
}
</script>

<style lang="scss" scoped>
header {
	width: 100%;
	height: 100vh;
	position: relative;
	overflow: hidden;
	& > .bg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: linear-gradient(
			180deg,
			hsl(240, 12%, 10%),
			hsl(240, 6%, 5%)
		);
		z-index: -1;
	}
	& > .sections {
		position: relative;
		width: calc(100vw - #{$navigation-width});
		height: 100%;
		top: 0;
		left: #{$navigation-width};
		@media screen and (max-width: $widescreen) {
			width: 100vw;
		}
	}
}
</style>
