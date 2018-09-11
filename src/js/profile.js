/* eslint-disable no-new */

import Barba from 'barba.js'
import Masonry from 'masonry-layout'
import Clipboard from 'clipboard'
import nav from './nav'

export default Barba.BaseView.extend({
  namespace: 'profile',
  onEnter() {
    nav.moved('profile')
  },
  onEnterCompleted() {
    const $root = document.querySelector('#barba-wrapper > .barba-container')
    const $header = $root.querySelector(':scope header')
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

    const $section = $root.querySelector(':scope section')
    new Masonry($section.querySelector('.cards'), {
      itemSelector: '.card',
      columnWidth: '.sizer',
      percentPosition: true,
      transitionDuration: 0,
    })
    const $cardSocial = $section.querySelector('.card.socials')
    new Clipboard($cardSocial.querySelectorAll('.socials > .copy'))
  },
})