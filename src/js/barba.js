import Barba from 'barba.js'
import imagesLoaded from 'imagesloaded'
import index from '.'
import profile from './profile'
import contact from './contact'
import works from './works'
import nav from './nav'
import terminal from './terminal'

index.init()
profile.init()
works.init()
contact.init()
Barba.Pjax.getTransition = () =>
  Barba.BaseTransition.extend({
    start() {
      nav.linkStop(true)
      terminal.appear()
      terminal.clear()
      terminal.addLine(`cat ${location.href}`)
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
        terminal.addLine('Images loading started.')
        const progress = terminal.addProgressBar(
          'Images',
          imgLoad.images.length
        )
        imgLoad.on('progress', () => {
          progress()
        })
        imgLoad.on('done', () => {
          terminal.addLine('Images loading succeeded.')
          resolve()
        })
        imgLoad.on('fail', () => {
          terminal.addLine('Images loading failed.')
          reject()
        })
      }).then(() => {
        terminal.addLine('Page is ready.')
        setTimeout(() => {
          terminal.disappear()
          $new.classList.add('fadeIn')
        }, 500)
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
