import Barba from 'barba.js'
import nav from './nav'

export default Barba.BaseView.extend({
  namespace: 'contact',
  onEnter() {
    nav.moved('contact')
  },
  onEnterCompleted() {
    const $title = document.getElementById('title')
    const $texts = document.getElementById('texts')
    const $form = document.getElementById('form')
    $title.style.animationPlayState = 'running'
    $texts.style.animationPlayState = 'running'
    $form.style.animationPlayState = 'running'
  },
})
