import WebfontLoader from 'webfontloader'

export default new Promise(resolve => {
	WebfontLoader.load({
		google: {
			families: [
				'Cutive Mono',
				'Assistant',
				'Dosis',
				'Poppins:400',
				'Sawarabi Gothic',
			],
		},
		active: resolve,
	})
})
