module.exports = {
	modules: ['nuxt-sass-resources-loader'],
	css: ['minireset.css'],
	sassResources: ['mathsass', 'sass-metallic-ratio'],
	head: {
		titleTemplate: '%s - SnO2WMaN.Graphics',
		meta: [{ charset: 'utf-8' }],
		link: [
			{
				rel: 'icon',
				type: 'image/png',
				href: 'favicon.png',
			},
		],
	},
	routes: [
		{
			name: 'index',
			path: '/',
			component: 'pages/index.vue',
		},
	],
}
