import webfontloader from 'webfontloader'
// import sno2wmanSVG from '../images/sno2wman.svg'

const debug = true

const $loading = document.getElementById('loading')
// $loading.querySelector('.icon-wrap').innerHTML = sno2wmanSVG

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

const loading = debug
  ? () =>
      new Promise(resolve => {
        $loading.style.display = 'none'
        resolve()
      })
  : () =>
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
          .then(() => {
            return Promise.all([
              ...[...$loading.querySelectorAll('.faders > .fader')].map($e => {
                $e.style.animationPlayState = 'running'
                return new Promise(resolve =>
                  $e.addEventListener('animationend', resolve)
                )
              }),
            ])
          })
          .then(() => {
            $loading.style.backgroundColor = 'transparent'
            $loading.querySelector('.faders').style.visibility = 'hidden'
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
