<template>
	<div class="card">
		<div class="icon"><img :src="image" class="icon" /></div>
		<div class="details">
			<p
				v-if="typeof name === 'string'"
				:class="{ en: isID(name) }"
				class="name"
			>
				{{ name }}
			</p>
			<p v-else class="name">
				<span class="real">{{ name.real }}</span>
				<span class="id">{{ name.id }}</span>
			</p>
			<p class="comment">{{ comment }}</p>
			<ul class="links">
				<li
					v-for="(link, key) in links"
					:key="key"
					:class="key"
					class="link"
				>
					<div class="icon">
						<FontAwesomeIcon :icon="linkIcons[key]" />
					</div>
					<a :href="mkLink(link, key)" class="link" target="_blank" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import {
	faTwitter,
	faGithub,
	faFacebook,
} from '@fortawesome/free-brands-svg-icons'

export default {
	name: 'NameCard',
	components: {
		FontAwesomeIcon,
	},
	props: {
		name: { type: String | Object, default: '' },
		image: { type: String, default: '' },
		comment: { type: String, default: undefined },
		links: { type: Object, default: new Object() },
	},
	data() {
		return {
			linkIcons: {
				web: faGlobe,
				twitter: faTwitter,
				github: faGithub,
				facebook: faFacebook,
			},
		}
	},
	methods: {
		isID(text) {
			return /^[A-Za-z0-9-]+$/.test(text)
		},
		mkLink(link, type) {
			switch (type) {
				case 'twitter':
					return `https://twitter.com/${link}`
				case 'github':
					return `https://github.com/${link}`
				default:
					return link
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	flex-direction: row;
	background: white;
	box-shadow: 0 1px 3px rgba(black, 0.05);
	& > .icon {
		size: 6rem;
		display: flex;
		user-select: none;
	}
	& > .details {
		flex-grow: 2;
		display: flex;
		flex-direction: column;
		padding: 0.5rem 0;
		padding-left: 1rem;
		& > .name {
			font-size: 1.1rem;
			color: $text;
			letter-spacing: 1px;
			font-weight: 500;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			font-family: 'Noto Sans JP', sans-serif;
			& > .en {
				font-family: 'Source Sans', sans-serif;
			}
			& > .real {
				font-family: 'Noto Sans JP', sans-serif;
				font-weight: 500;
			}
			& > .id {
				font-size: 0.8rem;
				letter-spacing: 1px;
				font-weight: 400;
				font-family: 'Source Sans', sans-serif;
			}
		}
		& > .comment {
			color: $text;
			font-size: 0.75rem;
			font-family: 'Noto Sans JP', sans-serif;
		}
		& > .links {
			flex-grow: 2;
			display: flex;
			align-items: flex-end;
			& > .link {
				position: relative;
				&:not(:last-of-type) {
					margin-right: 0.5rem;
				}
				& > .link {
					position: absolute;
					z-index: 2;
					size: 100%;
					top: 0;
					left: 0;
				}
				& > .icon {
					position: relative;
					z-index: 1;
					color: white;
					font-size: 0.9rem;
					size: 1.5em;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				&:before {
					content: '';
					position: absolute;
					size: 100%;
					top: 0;
					left: 0;
					border-radius: 50%;
				}
				$socials: (
					web: royalblue,
					twitter: #1da1f2,
					facebook: #3b5998,
					github: #24292e,
				);
				@each $social, $color in $socials {
					&.#{$social} {
						&:before {
							background: $color;
						}
					}
				}
			}
		}
	}
}
</style>
