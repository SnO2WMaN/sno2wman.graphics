import Barba from 'barba.js'
import imagesLoaded from 'imagesloaded'
import index from '.'
import works from './works'
import nav from './nav'

function createSimpleView(namespace) {
  return Barba.BaseView.extend({
    namespace,
    onEnter() {
      nav.moved(namespace)
    },
  })
}

index.init()
createSimpleView('profile').init()
works.init()
createSimpleView('contact').init()
Barba.Pjax.getTransition = () =>
  Barba.BaseTransition.extend({
    start() {
      nav.linkStop(true)
      Promise.all([this.newContainerLoading, this.fadeOut()])
        .then(() => this.fadeIn())
        .then(this.finish.bind(this))
    },
    fadeOut() {
      const $old = this.oldContainer
      $old.classList.add('fadeOut')
      return new Promise(resolve => {
        $old.addEventListener('transitionend', resolve, { once: true })
      })
    },
    fadeIn() {
      const $new = this.newContainer
      return new Promise((resolve, reject) => {
        const imgLoad = imagesLoaded($new, { background: true })
        imgLoad.on('done', resolve)
        imgLoad.on('fail', reject)
      }).then(() => {
        $new.classList.add('fadeIn')
        return new Promise(resolve =>
          $new.addEventListener(
            'animationend',
            () => {
              $new.classList.remove('fadeIn')
              nav.linkStop(false)
              resolve()
            },
            { once: true }
          )
        )
      })
    },
    finish() {
      this.done()
    },
  })

function start() {
  Barba.Prefetch.init()
  Barba.Pjax.start()
}

export default { start }
