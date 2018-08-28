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

    const $years = [...$worksWrap.querySelectorAll('._2018,._2017')]
    const rayoutInits = $years.map(
      $year =>
        new Promise(resolve => {
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
          msnry.once('layoutComplete', () => {
            $year.msnry = msnry
            $year.$all = msnry.getItemElements()
            $year.querySelector('.title-wrap').classList.add('loaded')
            $works.classList.add('loaded')
            resolve()
          })
          msnry.layout()
        })
    )
    const inited = () => {
      $menuWrap.querySelectorAll('.year > li').forEach($menu => {
        const selector = $menu.getAttribute('data-selector')
        $menu.addEventListener('click', () => {
          $worksWrap.scrollTop = $worksWrap.querySelector(
            `._${selector}`
          ).offsetTop
        })
      })
      $menuWrap.querySelectorAll('.genre > li,.type > li').forEach($menu => {
        const selector = $menu.getAttribute('data-selector')
        $menu.addEventListener('click', () => {
          $worksWrap.scrollTop = 0
          const selected = $menu.classList.contains('selected')
          if (selected) {
            $menu.classList.remove('selected')
          } else {
            const $before = $menuWrap.querySelector('.selected')
            if ($before) {
              $before.classList.remove('selected')
            }
            $menu.classList.add('selected')
          }
          $years.forEach($year => {
            const $works = $year.querySelector('.works')
            const msnry = $year.msnry
            const $all = $year.$all
            const $appended = selected
              ? $all
              : $all.filter($work =>
                  $work
                    .getAttribute('data-tags')
                    .split(',')
                    .includes(selector)
                )
            $appended.forEach(($work, i) => {
              $work.style.animationDelay = `${i * 0.15}s`
            })
            msnry.remove(msnry.getItemElements())
            $works.append(...$appended)
            msnry.appended($appended)
            msnry.reloadItems()
            msnry.layout()
          })
        })
      })
    }
    Promise.all(rayoutInits).then(inited)
  },
})
