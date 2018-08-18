import webfontloader from 'webfontloader'

const debug = true
const $loading = document.getElementById('loading')
const $nav = document.getElementById('nav')

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

const nav = () => {
  return new Promise(resolve => {
    $nav.style.animationPlayState = 'running'
    $nav.addEventListener('animationend', resolve)
  }).then(() => {
    return Promise.all([
      ...[...$nav.querySelectorAll('.title-wrap .site span')].map($span => {
        return new Promise(resolve => {
          $span.style.animationPlayState = 'running'
          const ch = $span.innerHTML
          const shuffler = setInterval(() => {
            $span.innerHTML = String.fromCharCode(
              48 + Math.floor(Math.random() * 74)
            )
          }, 40)
          $span.addEventListener('animationend', () => {
            clearInterval(shuffler)
            $span.innerHTML = ch
            resolve()
          })
        })
      }),
      ...[...$nav.querySelectorAll('.title-wrap .profile span')].map($span => {
        return new Promise(resolve => {
          $span.style.animationPlayState = 'running'
          $span.addEventListener('animationend', resolve)
        })
      }),
      ...[...$nav.querySelectorAll('.socials > .social')].map($social => {
        $social.classList.add('running')
        return Promise.all([
          ...[
            ...$social.querySelectorAll(
              '.covers > .cover,.icon,.borders > .border'
            ),
          ].map(
            $e =>
              new Promise(resolve =>
                $e.addEventListener('animationend', resolve)
              )
          ),
        ])
      }),
      ...[...$nav.querySelectorAll('.menu > li')].map($social => {
        $social.classList.add('running')
        return Promise.all([
          ...[...$social.querySelectorAll('p,.covers > .cover,.border')].map(
            $e =>
              new Promise(resolve =>
                $e.addEventListener('animationend', resolve)
              )
          ),
        ])
      }),
      ...[...$nav.querySelectorAll('.licence-wrap > .licence')].map(
        $licence => {
          $licence.classList.add('running')
          return Promise.all([
            ...[...$licence.querySelectorAll('p,border')].map(
              $e =>
                new Promise(resolve =>
                  $e.addEventListener('animationend', resolve)
                )
            ),
          ])
        }
      ),
    ])
  })
}

export default Promise.all([webfont])
  .then(() => loading())
  .then(() => nav())
