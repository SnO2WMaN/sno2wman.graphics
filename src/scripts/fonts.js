import WebfontLoader from 'webfontloader'

export default new Promise(resolve => {
	WebfontLoader.load({
		google: {
			families: ['Cutive Mono', 'Dosis', 'Assistant', 'Sawarabi Gothic'],
		},
		active: resolve,
	})
})