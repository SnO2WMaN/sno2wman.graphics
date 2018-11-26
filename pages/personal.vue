<template>
	<article><PageHeader title="PERSONAL" subtitle="個人的な制作物" /></article>
</template>

<script>
import PageHeader from '~/components/PageHeader'
export default {
	components: { PageHeader },
	head() {
		return { title: 'Personal' }
	},
}
</script>
