<template>
	<div class="globalnav">
		<div class="wrap">
			<div class="home">
				<nuxt-link class="link" to="/" />
				<div class="icon"><img src="~/assets/images/me.png" /></div>
				<h1>SnO2WMaN</h1>
			</div>
			<ul class="menu">
				<li
					v-for="(menuitem, menuname) in menu"
					:key="menuname"
					class="menuitem"
				>
					<nuxt-link :to="menuitem.link" class="link" />
					<div class="icon">
						<FontAwesomeIcon :icon="menuitem.icon" fixed-width />
					</div>
					<p>{{ menuname.toUpperCase() }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import capitalize from 'capitalize'
import {
	faBriefcase,
	faEnvelope,
	faAddressCard,
	faFeather,
	faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons'

export default {
	name: 'GlobalNav',
	components: {
		FontAwesomeIcon,
	},
	data() {
		return {
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
	& > .wrap {
		width: $widescreen;
		display: flex;
		padding-top: 2rem;
		& > .home {
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
				& > p {
					color: #3f3f3f;
					font-size: 0.8rem;
					line-height: 1em;
					font-weight: 400;
					font-family: 'Source Sans pro', sans-serif;
					letter-spacing: 0.1rem;
				}
			}
		}
	}
	@media screen and (max-width: $widescreen) {
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
}
</style>
