import Barba from 'barba.js'
import nav from './nav'

export default Barba.BaseView.extend({
  namespace: 'contact',
  onEnter() {
    nav.moved('contact')
  },
  onEnterCompleted() {
    const $form = document.getElementById('form')
    $form.style.animationPlayState = 'running'
  },
})
