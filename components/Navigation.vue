<template>
	<div class="navigation">
		<div class="top">
			<ul>
				<li v-for="(link, name) in menu" :key="name">
					<p>{{ name.toUpperCase() }}</p>
				</li>
			</ul>
		</div>
		<div class="bottom">
			<div class="top">
				<img class="icon" src="~assets/images/icon.png" />
				<p>SnO<sub>2</sub>WMaN</p>
			</div>
			<div class="profile">
				<p>Frontend, Voxel, Generative</p>
				<p>&amp; etc...</p>
				<p>Born in 2001.</p>
			</div>
			<ul class="socials">
				<li v-for="(link, key) in socials" :key="key" :class="key">
					<FontAwesomeIcon :icon="icons[key]" class="icon" />
					<a :href="link" />
				</li>
			</ul>
		</div>
		<div
			:class="{ hamburger: true, active: mobileopen }"
			@click="mobileopen = !mobileopen"
		>
			<div class="bars">
				<div class="bar" />
				<div class="bar" />
				<div class="bar" />
				<div class="bar" />
				<div class="bar" />
			</div>
		</div>
		<div
			:class="{
				mobilemenu: true,
				active: mobileopen,
			}"
			@click="mobileopen = !mobileopen"
		>
			<ul class="link">
				<li v-for="(link, name) in menu" :key="name">
					<p>{{ name.toUpperCase() }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faTwitter,
	faGithub,
	faTumblr,
} from '@fortawesome/free-brands-svg-icons'

import social from 'assets/social.json'

export default {
	name: 'Navigation',
	components: {
		FontAwesomeIcon,
	},
	data() {
		return {
			mobileopen: false,
		}
	},
	computed: {
		socials() {
			return {
				twitter: social.twitter,
				github: social.github,
				tumblr: social.tumblr,
			}
		},
		icons() {
			return {
				twitter: faTwitter,
				github: faGithub,
				tumblr: faTumblr,
			}
		},
		menu() {
			return {
				home: '',
				profile: '',
				works: '',
				contact: '',
			}
		},
	},
}
</script>

<style lang="scss" scoped>
$menu: 4;

$text: #b9b9b9;

.navigation {
	position: fixed;
	top: 0;
	left: 0;
	width: $navigation-width;
	height: 100%;
	display: flex;
	flex-direction: column;
	z-index: 9999;
	padding-left: 4rem;
	$p: 3;
	& > .top {
		height: (100% - (100% / metallic($p)));
		padding-top: 4rem;
		user-select: none;
		& > ul {
			display: flex;
			flex-direction: column;
			& > li {
				&:not(:last-of-type) {
					margin-bottom: 1.5rem;
				}
				& > p {
					line-height: 1em;
					font-size: 0.9rem;
					font-family: 'Josefin Sans', sans-serif;
					letter-spacing: 0.2rem;
					color: $text;
				}
			}
		}
	}
	& > .bottom {
		height: (100% / metallic($p));
		user-select: none;
		& > .top {
			margin-bottom: 1.25rem;
			display: flex;
			align-items: center;
			& > .icon {
				size: 2.5rem;
				margin-right: 1.25rem;
				border-radius: 50%;
			}
			& > p {
				color: $text;
				font-size: 1rem;
				font-family: 'Press Start 2P', sans-serif;
				letter-spacing: 0.15rem;
				& > sub {
					font-size: 0.8em;
				}
			}
		}
		& > .profile {
			margin-bottom: 1.25rem;
			& > p {
				font-weight: 400;
				font-family: 'IBM Plex Sans', sans-serif;
				color: $text;
				font-size: 0.9rem;
				letter-spacing: 1px;
				line-height: 1em;
				&:not(:last-of-type) {
					margin-bottom: 0.5rem;
				}
			}
		}
		& > .socials {
			display: flex;
			flex-direction: row;
			& > li {
				display: flex;
				position: relative;
				border: 1px solid $text;
				border-radius: 50%;
				transition: 0.125s $easeInOutQuad;
				transition-property: border-color, background-color;
				& > .icon {
					size: 2.5rem;
					padding: (2.5rem * (metallic(1) - 1) / 2);
					color: $text;
					transition-duration: inherit;
					transition-timing-function: inherit;
					transition-property: transform, color;
				}
				& > a {
					position: absolute;
					top: 0;
					left: 0;
					size: 100%;
				}
				&:not(:last-of-type) {
					margin-right: 1.25rem;
				}
				@each $key in (twitter, github, tumblr) {
					&.#{$key} {
						&:hover {
							background-color: rgba(
								map-get($brandcolors, $key),
								0.9
							);
							border-color: rgba(white, 0.5);
							& > .icon {
								color: white;
								transform: scale(1.1);
							}
						}
					}
				}
			}
		}
	}
	& > .hamburger {
		visibility: hidden;
		position: fixed;
		right: 0;
		top: 0;
		$size: 7.5vmax;
		margin-top: ($size / 2);
		margin-right: ($size / 2);
		size: $size;
		padding: ($size / sqrt(2) / 2);
		z-index: 5;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			size: 100%;
			background: rgba(black, 0.125);
			border-radius: 50%;
			opacity: 0;
			transform: 0.125s ease opacity;
		}
		&:active {
			&:before {
				opacity: 1;
			}
		}
		& > .bars {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			size: 100%;
			& > .bar {
				width: 100%;
				height: 1px;
				background-color: #fff;
				transition: transform 0.25s ease-in;
				&:nth-of-type(1) {
					transform-origin: left;
				}
				&:nth-of-type(3) {
					transform-origin: right;
				}
				&:nth-of-type(4),
				&:nth-of-type(5) {
					position: absolute;
				}
				&:nth-of-type(4) {
					transform: rotate(45deg) scaleX(0);
				}
				&:nth-of-type(5) {
					transform: rotate(-45deg) scaleX(0);
				}
			}
		}
		&.active {
			& > .bars {
				& > .bar {
					background-color: #000;
					&:nth-of-type(1),
					&:nth-of-type(2),
					&:nth-of-type(3) {
						transform: scaleX(0);
					}
					&:nth-of-type(4) {
						transform: rotate(45deg) scaleX(1);
					}
					&:nth-of-type(5) {
						transform: rotate(-45deg) scaleX(1);
					}
				}
			}
		}
	}
	& > .mobilemenu {
		$menu-dur: 0.25s;
		$menu-del: 0.05s;

		position: fixed;
		top: 0;
		left: 0;
		size: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1;
		background-color: rgba(#eee, 0);
		visibility: hidden;
		transition: ($menu-dur + $menu-del * ($menu - 1)) $easeInOutExpo;
		transition-property: background-color, visibility;
		& > .link {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			& > li {
				user-select: none;
				overflow: hidden;
				&:not(:last-of-type) {
					margin-bottom: 1rem;
				}
				& > p {
					color: #1f1f1f;
					letter-spacing: 6px;
					font-size: 1.25rem;
					font-weight: 300;
					font-family: 'Poppins', sans-serif;
					transform: translateY(100%);
					opacity: 0;
					transition: $menu-dur $easeOutCubic;
					transition-property: opacity, transform;
				}
				@for $i from 0 to 4 {
					&:nth-of-type(#{$i + 1}) {
						& > p {
							transition-delay: $i * $menu-del;
						}
					}
				}
			}
		}
		&.active {
			visibility: visible;
			background-color: rgba(#eee, 0.9);
			& > .link {
				& > li {
					& > p {
						transform: translateY(0);
						opacity: 1;
					}
				}
			}
		}
	}
	@media screen and (max-width: $widescreen) {
		padding: 0;
		width: 100%;
		height: auto;
		& > .top,
		& > .bottom {
			display: none;
		}
		& > .hamburger {
			visibility: visible;
		}
		& > .mobilemenu {
			&.active {
				visibility: visible;
			}
		}
	}
}
</style>
