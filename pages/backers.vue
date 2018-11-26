<template>
	<article>
		<PageHeader
			:texts="[
				'頂いた金銭は開発機材、ライセンス代等に使わせていただいています。',
				'ありがとうございます。',
			]"
			title="BACKERS"
			subtitle="お世話になった方々"
		/>
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
import backers from '~/assets/backers.json'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PageHeader from '~/components/PageHeader'
import NameCard from '~/components/backers/NameCard'

import { faGrinSquintTears } from '@fortawesome/free-solid-svg-icons'

export default {
	components: { PageHeader, FontAwesomeIcon, NameCard },
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
		margin-bottom: 2rem;
		margin-right: 2.5%;
		@media screen and (min-width: $tablet) and (max-width: $widescreen) {
			width: 47.5%;
			margin-right: 0;
			&:nth-of-type(2n + 1) {
				margin-right: 5%;
			}
		}
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
		font-family: 'Poppins', sans-serif;
		letter-spacing: 0.1rem;
		font-weight: 500;
		& > .thanks {
			margin-left: 0.5rem;
		}
	}
}
</style>
