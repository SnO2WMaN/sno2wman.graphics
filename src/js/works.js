import bezierEasing from 'bezier-easing'
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
    const rayoutInits = $years.map($year => {
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
      return new Promise(resolve => {
        msnry.once('layoutComplete', () => {
          $year.msnry = msnry
          $year.$all = msnry.getItemElements()
          $year.querySelector('.title-wrap').classList.add('loaded')
          $works.classList.add('loaded')
          resolve()
        })
        msnry.layout()
      })
    })
    const inited = () => {
      $menuWrap.querySelectorAll('.year > li').forEach($menu => {
        const selector = $menu.getAttribute('data-selector')
        $menu.addEventListener('click', () => {
          if ($worksWrap.classList.contains('scrolling')) {
            return
          }
          const from = $worksWrap.scrollTop
          const to = $worksWrap.querySelector(`._${selector}`).offsetTop
          const move = to - from
          if (Math.abs(move) < 100) {
            return
          }
          $worksWrap.classList.add('scrolling')
          const easing = bezierEasing(0.77, 0.0, 0.175, 1.0)
          let i = 0
          const v = 0.025 * (3000 / Math.abs(move))
          const scroll = () => {
            if (i > 1) {
              $worksWrap.scrollTop = to
              $worksWrap.classList.remove('scrolling')
              return
            }
            i += v
            $worksWrap.scrollTop = from + easing(i) * move
            requestAnimationFrame(scroll)
          }
          scroll()
        })
      })
      $menuWrap.querySelectorAll('.genre > li,.type > li').forEach($menu => {
        const selector = $menu.getAttribute('data-selector')
        $menu.addEventListener('click', () => {
          if ($worksWrap.classList.contains('scrolling')) {
            return
          }
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
          Promise.all(
            $years.map($year => {
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
              return new Promise(resolve => {
                msnry.once('layoutComplete', resolve)
                msnry.layout()
              })
            })
          ).then(() => {
            $menuWrap
              .querySelector('.year > li[data-selector="2018"')
              .dispatchEvent(new Event('click'))
          })
        })
      })
    }
    Promise.all(rayoutInits).then(inited)
  },
})
