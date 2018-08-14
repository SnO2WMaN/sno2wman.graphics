import Barba from 'barba.js'
import nav from './nav'

let hero
let isHeroMovable

const heroes = 3

const $nav = nav.$nav
const $heroGuide = $nav.querySelector('.hero-guide')

let heroMove

function enter() {
  nav.moved('index')

  const $heroes = document.getElementById('heroes')
  const $heroButtons = $heroGuide.querySelectorAll('.buttons > .button')
  const $heroImages = $heroes.querySelector('.hero-images')
  heroMove = to => {
    if (!isHeroMovable) {
      return
    }
    isHeroMovable = false
    $heroGuide.classList.remove(`hero-${hero}`)
    $heroGuide.classList.add(`hero-${to}`)
    const $old = $heroImages.querySelector(`.image:nth-of-type(${hero})`)
    const $new = $heroImages.querySelector(`.image:nth-of-type(${to})`)
    Promise.all([
      new Promise(resolve => {
        $old.classList.remove('fadeIn')
        $old.classList.add('fadeOut')
        $old.addEventListener('transitionend', resolve, { once: true })
      }),
      new Promise(resolve => {
        $new.classList.remove('fadeOut')
        $new.classList.add('fadeIn')
        $new.addEventListener('transitionend', resolve, { once: true })
      }),
    ]).then(() => {
      $old.classList.remove('fadeOut')
      hero = to
      isHeroMovable = true
    })
  }
  $heroes.addEventListener('wheel', e => {
    if (e.deltaY < 0) {
      heroMove(hero - 1 < 1 ? heroes : hero - 1)
    } else {
      heroMove(hero + 1 > heroes ? 1 : hero + 1)
    }
  })
  $heroButtons.forEach(($button, i) => {
    $button.addEventListener('click', () => {
      if (hero === i + 1) {
        return
      }
      heroMove(i + 1)
    })
  })

  isHeroMovable = true
  hero = 1
  $heroGuide.classList.add('visible')
}

function leave() {
  $heroGuide.classList.remove('visible', ...['hero-1', 'hero-2', 'hero-3'])
}

export default Barba.BaseView.extend({
  namespace: 'index',
  onEnter() {
    enter()
  },
  onEnterCompleted() {
    heroMove(1)
  },
  onLeave() {
    leave()
  },
})
