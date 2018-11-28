<template>
	<article>
		<PageHeader class="header" title="PROFILE" subtitle="アバウト・ミー" />
		<section class="cards">
			<div class="me"><img src="~/assets/images/standing.png" /></div>
			<div class="card profile">
				<h1>PROFILE</h1>
				<h2>こいつはこんなやつ</h2>
				<div class="texts">
					<p>ナード的活動をしている無軌道な学生です。</p>
					<p>ウェブデザインやボクセルを作って日々を貪っています。</p>
					<p>飲食物ではペプシコーラが好きです。</p>
					<p>文章を書いたりするのが苦手です。</p>
				</div>
			</div>
			<div class="card details">
				<h1>DETAILS</h1>
				<h2>詳細</h2>
				<ul class="list">
					<li v-for="(detail, key) in details" :key="key">
						<div class="icon">
							<FontAwesomeIcon :icon="icons[key]" fixed-width />
						</div>
						<span class="key">{{ key.toUpperCase() }}</span>
						<a
							:href="
								`https://ja.wikipedia.org/wiki/${
									wikipedia[key]
								}`
							"
							target="_blank"
							class="detail"
						>
							{{ detail }}
						</a>
					</li>
				</ul>
			</div>
			<div class="card socials">
				<h1>SOCIALS</h1>
				<h2>ここにいるぞ</h2>
				<ul class="socialslist">
					<li
						v-for="(social, key) in socials"
						:key="key"
						:class="key"
					>
						<div class="icon">
							<img
								v-if="Object.keys(socialsLogo).includes(key)"
								:src="socialsLogo[key]"
							/>
							<FontAwesomeIcon
								v-else
								:icon="icons[key]"
								fixed-width
							/>
						</div>
						<span class="key">{{ capitalize(key) }}</span>
						<div class="type">
							<FontAwesomeIcon
								v-if="Array.isArray(social)"
								:icon="icons['copy']"
								fixed-width
							/>
							<FontAwesomeIcon
								v-else
								:icon="icons['link']"
								fixed-width
							/>
						</div>
						<Clipboard
							v-if="Array.isArray(social)"
							:text="social[0]"
							class="link"
						/>
						<a v-else :href="social" class="link" target="_blank" />
					</li>
				</ul>
			</div>
			<div class="card skillsets">
				<h1>SKILLSETS</h1>
				<h2>ﾁｮｯﾄﾃﾞｷﾙ</h2>
				<ul class="list">
					<li class="center">
						<p>
							<FontAwesomeIcon
								:icon="icons['learning']"
								class="icon"
							/>
							means "Now Learning"
						</p>
					</li>
					<li v-for="(skillset, key) in skillsets" :key="key">
						<div class="icon">
							<FontAwesomeIcon :icon="icons[key]" fixed-width />
						</div>
						<span class="key">{{ key.toUpperCase() }}</span>
						<ul class="skills">
							<li
								v-for="(skill, skillkey) in skillset"
								:key="skillkey"
							>
								<p v-if="Array.isArray(skill)">
									{{ skill[0] }}
									<FontAwesomeIcon
										:icon="icons['learning']"
										class="icon"
									/>
								</p>
								<span v-else>{{ skill }}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</section>
	</article>
</template>

<script>
import { throttle } from 'lodash'
import capitalize from 'capitalize'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Clipboard from '~/components/Clipboard'
import PageHeader from '~/components/PageHeader'
import {
	faMars,
	faBirthdayCake,
	faClock,
	faUmbrellaBeach,
	faPastafarianism,
	faToolbox,
	faRocket,
	faBroom,
	faCodeBranch,
	faCode,
	faBoxes,
	faWarehouse,
	faSitemap,
	faBook,
	faExternalLinkAlt,
	faCopy,
} from '@fortawesome/free-solid-svg-icons'
import {
	faHtml5,
	faCss3,
	faJsSquare,
	faTwitter,
	faSpotify,
	faGithub,
	faTumblr,
	faSteam,
	faCodepen,
	faDiscord,
	faMastodon,
	faTwitch,
	faFacebook,
	faSoundcloud,
	faYoutube,
	faVimeo,
} from '@fortawesome/free-brands-svg-icons'

let throttled, resizeThrottled

export default {
	components: {
		FontAwesomeIcon,
		PageHeader,
		Clipboard,
	},
	data() {
		return {
			icons: {
				//some
				learning: faBook,
				link: faExternalLinkAlt,
				copy: faCopy,
				//details
				gender: faMars,
				birthday: faBirthdayCake,
				age: faClock,
				live: faUmbrellaBeach,
				religion: faPastafarianism,
				//skillsets
				html: faHtml5,
				css: faCss3,
				javascript: faJsSquare,
				framework: faWarehouse,
				tool: faToolbox,
				bundle: faBoxes,
				deploy: faRocket,
				lint: faBroom,
				versioning: faCodeBranch,
				editor: faCode,
				cms: faSitemap,
				//socials
				twitter: faTwitter,
				spotify: faSpotify,
				github: faGithub,
				tumblr: faTumblr,
				steam: faSteam,
				codepen: faCodepen,
				discord: faDiscord,
				mastadon: faMastodon,
				twitch: faTwitch,
				facebook: faFacebook,
				soundcloud: faSoundcloud,
				youtube: faYoutube,
				vimeo: faVimeo,
			},
			socialsLogo: {
				pixiv: require('~/assets/images/socials/pixiv.png'),
				qiita: require('~/assets/images/socials/qiita.png'),
			},
			wikipedia: {
				gender: '男性',
				birthday: '6月22日',
				age: '17歳',
				live: '名古屋市',
				religion: '空飛ぶスパゲッティ・モンスター教',
			},
			details: {
				gender: 'Male',
				birthday: '2001.06.22',
				age: '17',
				live: 'Japan, Nagoya',
				religion: 'Pastafarianism',
			},
			skillsets: {
				html: ['HTML5', 'Pug'],
				css: ['CSS3', 'SCSS', 'PostCSS'],
				javascript: ['Javascript', ['TypeScript', true]],
				bundle: ['Webpack', 'Parcel'],
				framework: [['Vue', true], ['Nuxt', true]],
				cms: [['Contentful', true]],
				deploy: ['Netlify'],
				tool: ['Browserslist', 'WebfontLoader', 'FontAwesome5'],
				lint: ['ESLint', 'Prettier', 'Stylelint', 'EditorConfig'],
				versioning: ['Git', 'GitKraken'],
				editor: ['VSCode'],
			},
			socials: {
				twitter: 'https://twitter.com/SnO2WMaN',
				spotify: 'https://open.spotify.com/user/sno2wman',
				steam: 'https://steamcommunity.com/id/SnO2WMaN',
				tumblr: 'https://sno2wman.tumblr.com',
				// soundcloud: 'https://soundcloud.com/sno2wman',
				// twitch: 'https://www.twitch.tv/sno2wman',
				// codepen: 'https://codepen.io/SnO2WMaN',
				github: 'https://github.com/SnO2WMaN',
				// mastadon: 'https://mstdn.jp/@SnO2WMaN',
				discord: ['SnO2WMaN#9459', true],
				qiita: 'https://qiita.com/SnO2WMaN',
				// youtube: '',
				// facebook: '',
				// pixiv: '',
			},
		}
	},
	head() {
		return { title: 'Profile' }
	},
	mounted() {
		const $cards = this.$el.querySelector('section.cards')
		const $me = $cards.querySelector('.me')
		throttled = () => {
			if (this.$el.scrollTop > $cards.offsetTop) {
				$me.classList.add('sticky')
			} else {
				$me.classList.remove('sticky')
			} /*
			$me.style.transform = `translateY(${Math.max(
				0,
				this.$el.scrollTop - $cards.offsetTop
			)}px)`*/
		}
		this.$el.addEventListener('scroll', throttled)
		window.addEventListener(
			'resize',
			(resizeThrottled = throttle(() => {
				this.resized()
			}, 1000 / 60))
		)
		this.resized()
	},
	beforeDestroy() {
		this.$el.removeEventListener('scroll', throttled)
		window.removeEventListener('resize', resizeThrottled)
	},
	methods: {
		capitalize,
		resized() {
			const $me = this.$el.querySelector('.cards > .me')
			const headerWidth = this.$el.querySelector('.header').offsetWidth
			$me.style.width = `${headerWidth}px`
		},
	},
}
</script>

<style lang="scss" scoped>
section {
	position: relative;

	@media screen and (max-width: $widescreen) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	@media screen and (max-width: $tablet) {
		padding: 0 calc((100vw - #{$outframe-width * 2}) / 12);
		padding-top: calc(25vh - #{$outframe-width / 2});
	}
	& > .me {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		height: calc(100vh - #{$outframe-width * 2});
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		pointer-events: none;
		& > img {
			height: 100%;
		}
		@media screen and (min-width: $tablet) and (max-width: $widescreen) {
			justify-content: flex-start;
			padding-left: 160px;
		}
		&.sticky {
			position: fixed;
			top: $outframe-width;
			left: $outframe-width;
			right: auto;
		}
	}
	& > .card {
		position: absolute;
		background-color: rgba(white, 0.5);
		box-shadow: 0 1px 3px rgba(black, 0.125);
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		&.profile {
			top: 0;
			left: 57%;
		}
		&.details {
			top: 120px;
			right: 58%;
		}
		&.skillsets {
			top: 320px;
			left: 58%;
		}
		&.socials {
			top: 510px;
			right: 57%;
		}
		@media screen and (max-width: $widescreen) {
			position: relative auto !important;
			width: (100% / (metallic(1) + 1));
			&:not(:last-of-type) {
				margin-bottom: 5vh;
			}
			&:last-of-type {
				margin-bottom: 10vh;
			}
		}
		@media screen and (min-width: $tablet) and (max-width: $widescreen) {
			right: (100% / 16) !important;
		}
		& > h1 {
			font-family: 'Poppins', sans-serif;
			font-size: 1.5rem;
			font-weight: 300;
			letter-spacing: 0.5rem;
			color: $text;
			margin-bottom: 0.5rem;
			line-height: 1em;
			@media screen and (max-width: $tablet) {
				font-size: 1.25rem;
				margin-bottom: 0.5rem;
			}
		}
		& > h2 {
			font-size: 0.85rem;
			color: $text;
			font-family: 'Noto Sans JP', sans-serif;
			letter-spacing: 0.05rem;
			position: relative;
			line-height: 1em;
			@media screen and (max-width: $tablet) {
				font-size: 0.75rem;
			}
		}
		@media screen and (max-width: $tablet) {
			width: 100%;
			position: relative;
			background-color: rgba(white, 0.9);
		}
		& > .texts,
		& > .list,
		& > .socialslist {
			position: relative;
			margin-top: 3rem;
			padding: 2rem 2rem;
			background-color: rgba($text, 0.75);
			width: 100%;
			&:before {
				content: '';
				position: absolute;
				top: -1.5rem;
				left: 0;
				right: 0;
				margin: auto;
				width: (100% / (metallic(1) + 1));
				border-bottom: 1px $text solid;
			}
			@media screen and (max-width: $tablet) {
				margin-top: 2rem;
				&:before {
					top: -1rem;
				}
			}
		}
		& > .texts {
			& > p {
				color: white;
				font-size: 0.7rem;
				font-family: 'Noto Sans JP', sans-serif;
				letter-spacing: 1px;
				line-height: 1.1em;
				font-weight: 300;
				&:not(:last-of-type) {
					margin-bottom: 0.5rem;
				}
				@media screen and (max-width: $tablet) {
					font-size: 0.7rem;
					letter-spacing: 0;
				}
			}
		}
		& > .list {
			display: flex;
			flex-direction: column;
			& > li {
				display: flex;
				justify-content: center;
				align-items: center;
				&.center {
					text-align: center;
					& > p {
						color: white;
						font-size: 0.75rem;
						font-weight: 300;
						font-family: 'Poppins', sans-serif;
						letter-spacing: 1px;
						& > .icon {
							margin-right: 0.25rem;
						}
					}
				}
				&:not(:last-of-type) {
					margin-bottom: 1.5rem;
					@media screen and (max-width: $tablet) {
						margin-bottom: 1.25rem;
					}
				}
				& > .icon {
					font-size: 0.75rem;
					margin-right: 1rem;
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				& > .key {
					font-family: 'Poppins', sans-serif;
					font-weight: 300;
					font-size: 0.6rem;
					color: white;
					letter-spacing: 0.1rem;
					margin-right: 4rem;
					line-height: 1em;
					padding-right: 0.5rem;
					border-right: 1px solid white;
					@media screen and (max-width: $tablet) {
						margin-right: 0;
					}
				}
				& > .detail {
					flex-grow: 2;
					font-size: 0.7rem;
					text-align: right;
					color: white;
					font-family: 'Poppins', sans-serif;
					letter-spacing: 0.05rem;
					line-height: 1em;
					font-weight: 300;
				}
				& > .skills {
					flex-grow: 2;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					& > li {
						display: flex;
						&:not(:last-of-type) {
							margin-bottom: 0.5rem;
						}
						& > span,
						& > p {
							font-size: 0.5rem;
							text-align: right;
							color: white;
							font-family: 'Poppins', sans-serif;
							letter-spacing: 0.1rem;
							line-height: 1em;
							font-weight: 300;
						}
						& > p {
							& > .icon {
								margin-left: 0.125rem;
							}
						}
					}
				}
			}
		}
		& > .socialslist {
			display: flex;
			flex-direction: column;
			justify-content: center;
			$margin: 0.75rem;
			margin-bottom: -$margin;
			& > li {
				box-shadow: 0 1px 3px rgba(black, 0.125);
				display: flex;
				align-items: center;
				margin-bottom: $margin;
				position: relative;
				overflow: hidden;
				user-select: none;
				$socials: (
					twitter: #1da1f2,
					spotify: #1db954,
					steam: #2b3647,
					tumblr: #35465c,
					discord: #7289da,
					twitch: #6441a5,
					codepen: #191a1d,
					github: #24292e,
					mastadon: #3088d4,
					qiita: #59bb0c,
					soundcloud: #ff8800,
					youtube: #ff0000,
					facebook: #3b5998,
					pixiv: #0196fa,
				);
				@each $social, $color in $socials {
					&.#{$social} {
						order: floor(hue($color) / 1deg);
						background-color: lighten(desaturate($color, 5%), 3%);
						& > .icon {
							background-color: $color;
						}
					}
				}
				& > .icon {
					color: white;
					margin-right: 1rem;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 1.125rem;
					size: 1.5rem * metallic(1);
					box-shadow: 1px 0 3px rgba(black, 0.175);
					z-index: 2;
					& > img {
						size: (100% / metallic(1));
					}
				}
				&:after {
					content: '';
					position: absolute;
					width: calc(100% - #{1.5rem * metallic(1)});
					height: 100%;
					top: 0;
					right: 0;
					background: rgba(white, 0.125);
					transform: scaleX(0);
					transform-origin: left;
					transition: 0.5s transform $easeInOutCubic;
				}
				transition: 0.25s transform $easeInOutCubic;
				&:hover,
				&:active {
					&:after {
						transform: scale(1);
					}
				}
				&:active {
					transform: translateY(4px);
				}
				& > .key {
					flex-grow: 2;
					min-width: 8em;
					text-align: left;
					color: white;
					font-weight: 300;
					font-size: 0.75rem;
					font-family: 'Poppins', sans-serif;
					letter-spacing: 0.1rem;
					line-height: 1em;
				}
				& > .type {
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 1.25rem;
					font-size: 0.75rem;
					size: 2em;
					padding-right: 1rem;
					@media screen and (max-width: $tablet) {
						margin-left: 0;
					}
				}
				& > .link {
					position: absolute;
					size: 100%;
					left: 0;
					top: 0;
					z-index: 5;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
