<template>
	<article>
		<header>
			<h1 class="title">BACKERS</h1>
			<h2 class="subtitle">お世話になった方々</h2>
			<div class="texts">
				<p>
					頂いた金銭は開発機材、ライセンス代等に使わせていただいています。
				</p>
				<p>ありがとうございます。</p>
			</div>
		</header>
		<section class="backers">
			<NameCard
				v-for="(backer, index) in backers"
				:key="index"
				:image="backer.image"
				:name="backer.name"
				:comment="backer.comment"
				:links="backer.links"
				class="card"
			/>
		</section>
		<section class="thanks">
			<h3>Thanks!<FontAwesomeIcon :icon="thanks" class="thanks" /></h3>
		</section>
	</article>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const backers = require('~/assets/backers.json')

import NameCard from '~/components/backers/NameCard'
import { faGrinSquintTears } from '@fortawesome/free-solid-svg-icons'

export default {
	components: { FontAwesomeIcon, NameCard },
	head() {
		return { title: 'Backers' }
	},
	data() {
		return {
			thanks: faGrinSquintTears,
			backers,
		}
	},
}
</script>

<style lang="scss" scoped>
header {
	padding-top: calc((100vh - #{$outframe-width * 2}) / 5);
	margin-bottom: calc((100vh - #{$outframe-width * 2}) / 10);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: $tablet) {
		padding-left: calc((100vw - #{$outframe-width * 2}) / 6);
		padding-right: calc((100vw - #{$outframe-width * 2}) / 6);
	}
	& > .title {
		font-size: 2.5rem;
		color: $text;
		font-family: 'Press Start 2P', sans-serif;
		letter-spacing: 0.5rem;
		margin-bottom: 1rem;
		@media screen and (max-width: $tablet) {
			font-size: 1.75rem;
			letter-spacing: 0.125rem;
		}
	}
	& > .subtitle {
		font-size: 1rem;
		color: $text;
		font-family: 'Noto Sans JP', sans-serif;
		letter-spacing: 0.1rem;
		font-feature-settings: 'palt';
		margin-bottom: 2rem;
		@media screen and (max-width: $tablet) {
			font-size: 0.9rem;
			letter-spacing: 1px;
		}
	}
	& > .texts {
		display: flex;
		flex-direction: column;
		align-items: center;
		& > p {
			font-size: 0.85rem;
			color: $text;
			font-family: 'Noto Sans JP', sans-serif;
			letter-spacing: 1px;
			font-feature-settings: 'palt';
			&:not(:last-of-type) {
				margin-bottom: 0.25rem;
			}
			@media screen and (max-width: $tablet) {
				font-size: 0.75rem;
				letter-spacing: 1px;
			}
		}
	}
}
section.backers {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 0 calc((100vw - #{$outframe-width * 2}) / 6);
	@media screen and (max-width: $tablet) {
		flex-direction: column;
		padding: 0 calc((100vw - #{$outframe-width * 2}) / 12);
	}
	& > .card {
		width: 22.5%;
		margin-bottom: 1rem;
		margin-right: 2.5%;
		@media screen and (max-width: $tablet) {
			width: 100%;
			margin-right: 0;
		}
	}
}

section.thanks {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: calc((100vh - #{$outframe-width * 2}) / 10);
	padding-bottom: 2rem;
	& > h3 {
		color: $text;
		font-size: 1rem;
		font-family: 'Montserrat', sans-serif;
		letter-spacing: 0.1rem;
		font-weight: 500;
		& > .thanks {
			margin-left: 0.5rem;
		}
	}
}
</style>
