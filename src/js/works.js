import Barba from 'barba.js'
import Masonry from 'masonry-layout'
import nav from './nav'

export default Barba.BaseView.extend({
  namespace: 'works',
  onEnter() {
    nav.moved('works')
    const $menu = document.getElementById('menu')
    $menu.classList.add('animate')

    const $worksRoot = document.getElementById('works')
    $worksRoot.querySelectorAll('._2018,._2017').forEach($year => {
      const $works = $year.querySelector('.works')
      $works.querySelectorAll('.work').forEach(($work, i) => {
        $work.style.animationDelay = `${i * 0.05}s`
      })
      const msnry = new Masonry($works, {
        itemSelector: '.work',
        columnWidth: '.sizer',
        percentPosition: true,
        transitionDuration: 0,
      })
      msnry.on('layoutComplete', () => {
        $works.classList.add('loaded')
      })
      msnry.layout()
    })
  },
})
