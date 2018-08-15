import webfontloader from 'webfontloader'

const webfont = new Promise(resolve => {
  webfontloader.load({
    google: {
      families: [
        'VT323',
        'Lobster Two:400i',
        'Poppins',
        'Roboto Mono',
        'Sawarabi Gothic:latin,japanese',
      ],
    },
    active() {
      resolve()
    },
  })
})

export default Promise.all([webfont])
