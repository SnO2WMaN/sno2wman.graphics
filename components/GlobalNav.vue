<template>
	<div class="globalnav">
		<div
			:class="{ mobile: mobileOn }"
			class="wrap"
			@click="mobileOn = false"
		>
			<div class="home">
				<nuxt-link class="link" to="/" @click="mobileOn = false" />
				<div class="icon"><img src="~/assets/images/me.png" /></div>
				<h1>SnO2WMaN</h1>
			</div>
			<ul class="menu">
				<li
					v-for="(menuitem, menuname) in menu"
					:key="menuname"
					class="menuitem"
				>
					<nuxt-link
						:to="menuitem.link"
						class="link"
						@click="mobileOn = false"
					/>
					<div class="icon">
						<FontAwesomeIcon :icon="menuitem.icon" fixed-width />
					</div>
					<p class="name">{{ menuname.toUpperCase() }}</p>
				</li>
			</ul>
		</div>
		<Hamburger class="hamburger" @clicked="mobileOn = !mobileOn" />
		<transition :duration="{ enter: 850, leave: 1000 }" name="mobilenav">
			<div v-show="mobileOn" class="mobilenav">
				<div class="home" @click="mobileOn = false">
					<nuxt-link class="link" to="/" @click="mobileOn = false" />
					<div class="icon"><img src="~/assets/images/me.png" /></div>
					<h1>
						<span v-for="char in 'SnO2WMaN'.split('')" :key="char">
							{{ char }}
						</span>
					</h1>
				</div>
				<ul class="menu">
					<li
						v-for="(menuitem, menuname) in menu"
						:key="menuname"
						class="menuitem"
						@click="mobileOn = false"
					>
						<nuxt-link :to="menuitem.link" class="link" />
						<div class="icon">
							<FontAwesomeIcon
								:icon="menuitem.icon"
								fixed-width
							/>
						</div>
						<p class="name">{{ menuname.toUpperCase() }}</p>
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faBriefcase,
	faEnvelope,
	faAddressCard,
	faFeather,
	faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons'

import Hamburger from '~/components/globalnav/Hamburger.vue'
import capitalize from 'capitalize'

export default {
	name: 'GlobalNav',
	components: {
		FontAwesomeIcon,
		Hamburger,
	},
	data() {
		return {
			mobileOn: false,
			menu: {
				profile: { icon: faAddressCard, link: 'profile' },
				business: { icon: faBriefcase, link: 'business' },
				personal: { icon: faFeather, link: 'personal' },
				contact: { icon: faEnvelope, link: 'contact' },
				backers: { icon: faHandHoldingUsd, link: 'backers' },
			},
		}
	},
	methods: {
		capitalize,
	},
}
</script>

<style lang="scss" scoped>
.globalnav {
	display: flex;
	justify-content: center;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	& > .wrap {
		width: $widescreen;
		display: flex;
		padding-top: 2rem;
		& > .home {
			display: flex;
			align-items: center;
			position: relative;
			z-index: 9000;
			& > .link {
				position: absolute;
				size: 100%;
				z-index: 1;
			}
			& > .icon {
				size: 3rem;
				border: #3f3f3f 0.25rem solid;
				border-radius: 50%;
				overflow: hidden;
			}
			& > h1 {
				color: #3f3f3f;
				margin-left: 1rem;
				font-family: 'Press Start 2P', monospace;
				line-height: 1em;
			}
		}
		& > .menu {
			display: flex;
			justify-content: flex-end;
			flex-grow: 2;
			z-index: 9000;
			& > .menuitem {
				padding: 0.5rem;
				position: relative;
				display: flex;
				align-items: center;
				&:not(:last-of-type) {
					margin-right: 1rem;
				}
				& > .link {
					position: absolute;
					size: 100%;
					z-index: 1;
				}
				& > .icon {
					color: #3f3f3f;
					margin-right: 0.75rem;
					font-size: 1rem;
				}
				& > .name {
					color: #3f3f3f;
					font-size: 0.8rem;
					line-height: 1em;
					font-weight: 500;
					font-family: 'Montserrat', sans-serif;
					letter-spacing: 0.2rem;
				}
			}
		}
	}
	& > .hamburger {
		size: 4rem;
		position: absolute;
		top: 0;
		right: 0;
		visibility: hidden;
		z-index: 9002;
	}
	& > .mobilenav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 9001;
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			size: 100%;
			background-color: rgba(white, 0.8);
			z-index: -1;
			opacity: 1;
		}
		& > .home {
			margin-bottom: 2.5rem;
			display: flex;
			align-items: center;
			position: relative;
			& > .link {
				position: absolute;
				size: 100%;
				z-index: 1;
			}
			& > .icon {
				size: 3rem;
				border: #3f3f3f 0.25rem solid;
				border-radius: 50%;
				overflow: hidden;
			}
			& > h1 {
				font-size: 0.8rem;
				color: #3f3f3f;
				margin-left: 2rem;
				font-family: 'Press Start 2P', monospace;
				overflow: hidden;
				& > span {
					display: inline-block;
				}
			}
		}
		& > .menu {
			flex-direction: column;
			align-items: flex-start;
			& > .menuitem {
				padding: 0.5rem;
				position: relative;
				display: flex;
				align-items: center;
				&:not(:last-of-type) {
					margin-bottom: 1rem;
				}
				& > .link {
					position: absolute;
					size: 100%;
					z-index: 1;
				}
				& > .icon {
					color: #3f3f3f;
					margin-right: 1.25rem;
					font-size: 0.8rem;
					transform-origin: right;
				}
				& > .name {
					color: #3f3f3f;
					font-size: 0.75rem;
					line-height: 1em;
					font-weight: 700;
					font-family: 'Montserrat', sans-serif;
					letter-spacing: 0.2rem;
					flex-grow: 2;
					text-align: right;
				}
			}
		}
		&.mobilenav-enter,
		&.mobilenav-leave-to {
			&:before {
				opacity: 0;
			}
			& > .home {
				& > .icon {
					transform: scale(0.2) rotate(90deg);
					opacity: 0;
				}
				& > h1 {
					& > span {
						transform: translateY(120%);
					}
				}
			}
			& > .menu {
				& > .menuitem {
					& > .icon {
						transform: translateX(-50%) scaleX(1.25);
						opacity: 0;
					}
					& > .name {
						transform: translateY(50%);
						opacity: 0;
					}
				}
			}
		}
		&.mobilenav-enter-active {
			&:before {
				transition: 0.5s opacity;
			}
			& > .home {
				& > .icon {
					transition: 0.5s transform $easeOutBack;
				}
				& > h1 {
					& > span {
						transition: 0.5s transform $easeInOutExpo;
						@for $i from 0 to 8 {
							&:nth-of-type(#{$i + 1}) {
								transition-delay: $i * 0.05s;
							}
						}
					}
				}
			}
			& > .menu {
				& > .menuitem {
					@for $i from 0 to 5 {
						&:nth-of-type(#{$i + 1}) {
							& > .icon {
								transition: 0.175s $easeOutExpo;
								transition-delay: $i * 0.05s;
								transition-property: opacity, transform;
							}
							& > .name {
								transition: 0.5s $easeOutBack;
								transition-delay: $i * 0.05s + 0.05s;
								transition-property: opacity, transform;
							}
						}
					}
				}
			}
		}
		&.mobilenav-leave-active {
			&:before {
				transition: 0.75s opacity;
				transition-delay: 0.25s;
			}
			& > .home {
				& > .icon {
					transition: 0.75s $easeOutCubic;
					transition-property: opacity, transform;
				}
				& > h1 {
					& > span {
						transition: 0.5s transform $easeInOutExpo;
						@for $i from 0 to 8 {
							&:nth-of-type(#{$i + 1}) {
								transition-delay: $i * 0.05s;
							}
						}
					}
				}
			}
			& > .menu {
				& > .menuitem {
					@for $i from 0 to 5 {
						&:nth-of-type(#{$i + 1}) {
							& > .icon {
								transition: 0.25s $easeInCubic;
								transition-delay: $i * 0.1s;
								transition-property: opacity, transform;
							}
							& > .name {
								transition: 0.25s $easeInCubic;
								transition-delay: $i * 0.1s;
								transition-property: opacity, transform;
							}
						}
					}
				}
			}
		}
	}
	@media screen and (min-width: $tablet) and (max-width: $widescreen) {
		width: auto;
		height: 100%;
		& > .wrap {
			width: 100%;
			padding: 2rem 0;
			padding-left: 2rem;
			flex-direction: column;
			& > .menu {
				flex-direction: column;
				& > .menuitem {
					&:not(:last-of-type) {
						margin-right: 0;
						margin-bottom: 0.5rem;
					}
					& > .icon {
						font-size: 1.1rem;
						margin-right: 0.8rem;
					}
					& > p {
						font-size: 0.9rem;
					}
				}
			}
		}
	}
	@media screen and (max-width: $tablet) {
		width: 100%;
		& > .wrap {
			visibility: hidden;
		}
		& > .hamburger {
			visibility: visible;
		}
	}
}
</style>
