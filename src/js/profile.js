import Barba from 'barba.js'
import nav from './nav'

export default Barba.BaseView.extend({
  namespace: 'profile',
  onEnter() {
    nav.moved('profile')
  },
  onEnterCompleted() {
    const $root = document.querySelector('#barba-wrapper > .barba-container')
    const $header = $root.querySelector('header')
    $header.querySelector('.image-wrap').classList.add('animated')
    $header.querySelector('.icon-wrap').classList.add('animated')
    $header
      .querySelectorAll('.contents > .title-wrap > h1 > span')
      .forEach($span => {
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
        })
      })
    $header
      .querySelector('.contents > .subtitles-wrap')
      .classList.add('animated')
    $header.querySelector('.guide-wrap').classList.add('animated')
  },
})
