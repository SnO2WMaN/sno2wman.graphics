const $nav = document.getElementById('nav')
const $socials = $nav.querySelector('.menu')
let before

function linkStop(stop = true) {
  if (stop) {
    $socials.classList.add('disable')
  } else {
    $socials.classList.remove('disable')
  }
}
function moved(target) {
  if (before) {
    $socials.classList.remove(before)
  }
  $socials.classList.add((before = target))
}

function animation() {
  return new Promise(resolve => {
    $nav.style.animationPlayState = 'running'
    $nav.addEventListener('animationend', resolve)
  }).then(() => {
    return Promise.all([
      ...[...$nav.querySelectorAll('.title-wrap .site span')].map($span => {
        return new Promise(resolve => {
          const origin = $span.innerHTML
          const ticker = setInterval(() => {
            $span.innerHTML = String.fromCharCode(
              48 + Math.floor(Math.random() * 74)
            )
          }, 40)
          $span.style.animationPlayState = 'running'
          $span.addEventListener('animationend', () => {
            clearInterval(ticker)
            $span.innerHTML = origin
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

export default { $nav, linkStop, moved, animation }
