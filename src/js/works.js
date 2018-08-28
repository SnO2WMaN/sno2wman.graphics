import Barba from 'barba.js'
import Masonry from 'masonry-layout'
import nav from './nav'

export default Barba.BaseView.extend({
  namespace: 'works',
  onEnter() {
    nav.moved('works')
  },
  onEnterCompleted() {
    const $worksWrap = document.getElementById('works-wrap')
    const $menuWrap = document.getElementById('menu')

    $menuWrap.classList.add('animate')

    $worksWrap.querySelectorAll('._2018,._2017').forEach($year => {
      const $works = $year.querySelector('.works')
      $works.querySelectorAll('.work').forEach(($work, i) => {
        $work.style.animationDelay = `${i * 0.15}s`
      })
      const msnry = new Masonry($works, {
        itemSelector: '.work',
        columnWidth: '.sizer',
        percentPosition: true,
        transitionDuration: 0,
      })
      const $elements = msnry.getItemElements()
      msnry.on('layoutComplete', () => {
        $year.querySelector('.title-wrap').classList.add('loaded')
        $works.classList.add('loaded')
        if (!msnry.filter) {
          m(msnry, $year, $elements)
        }
        msnry.filter = true
      })
      msnry.layout()
    })

    function m(msnry, $year, $elements) {
      $menuWrap.querySelectorAll('.genre,.type').forEach($menus => {
        $menus.querySelectorAll(':scope li').forEach($menu => {
          const selector = $menu.getAttribute('data-selector')
          $menu.addEventListener('click', () => {
            $worksWrap.scrollTop = 0
            if ($menus.querySelector(':scope .selected')) {
              $menus
                .querySelector(':scope .selected')
                .classList.remove('selected')
            }
            $menu.classList.add('selected')

            const $yearWorks = $year.querySelector('.works')
            const appended = $elements.filter($work =>
              $work
                .getAttribute('data-tags')
                .split(',')
                .includes(selector)
            )
            appended.forEach(($work, i) => {
              $work.style.animationDelay = `${i * 0.15}s`
            })
            msnry.remove(msnry.getItemElements())
            $yearWorks.append(...appended)
            msnry.appended(appended)
            msnry.reloadItems()
            msnry.layout()
          })
        })
      })
    }
  },
})
