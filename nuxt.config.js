module.exports = {
	modules: ['nuxt-sass-resources-loader'],
	css: ['minireset.css'],
	sassResources: [
		'mathsass',
		'sass-metallic-ratio',
		'~/assets/easings.scss',
		'~/assets/const.scss',
	],
	head: {
		titleTemplate: '%s - SnO2WMaN.Graphics',
		meta: [
			{
				charset: 'utf-8',
			},
			{
				name: 'viewport',
				content:
					'width=device-width,initial-scale=1.0,user-scalable=no',
			},
			{
				'http-equip': 'X-UA-Compatible',
				content: 'ie=edge',
			},
		],
		link: [
			{
				rel: 'icon',
				type: 'image/png',
				href: 'favicon.png',
			},
			{
				href:
					'https://fonts.googleapis.com/css?family=Press+Start+2P|Source+Sans+Pro:300,400,700|Montserrat:400,500,700',
				rel: 'stylesheet',
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
