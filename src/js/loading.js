import webfontloader from 'webfontloader'

const $loading = document.getElementById('loading')
const wait = 3000

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

const loading = () =>
  new Promise(r => {
    Promise.all([
      ...[...$loading.querySelectorAll('.loaders > .loader')].map($e => {
        return new Promise(resolve =>
          $e.addEventListener('animationiteration', () => {
            resolve()
          })
        )
      }),
    ])
      .then(() =>
        Promise.all([
          new Promise(resolve => {
            const $loadersWrap = $loading.querySelector('.loaders')
            $loadersWrap.style.animationPlayState = 'running'
            $loadersWrap.addEventListener('animationend', resolve)
          }),
          ...[
            ...$loading
              .querySelector('.icon-wrap')
              .querySelectorAll('path,circle'),
          ].map($e => {
            $e.style.animationPlayState = 'running'
            return new Promise(resolve =>
              $e.addEventListener('animationend', resolve)
            )
          }),
        ])
      )
      .then(() =>
        Promise.all([
          ...[...$loading.querySelectorAll('.faders > .fader')].map($e => {
            $e.style.animationPlayState = 'running'
            return new Promise(resolve =>
              $e.addEventListener('animationend', resolve)
            )
          }),
        ])
      )
      .then(() => {
        $loading.querySelector('.faders').style.visibility = 'hidden'
        $loading.style.backgroundColor = null
        return Promise.all([
          ...[...$loading.querySelectorAll('.rects .rect')].map($e => {
            $e.style.visibility = 'visible'
            $e.style.animationPlayState = 'running'
            return new Promise(resolve =>
              $e.addEventListener('animationend', resolve)
            )
          }),
        ])
      })
      .then(() => {
        $loading.style.visibility = 'hidden'
        r()
      })
  })

export default Promise.all([webfont]).then(() => loading())
