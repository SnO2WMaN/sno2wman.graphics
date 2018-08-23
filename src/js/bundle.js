import './fontawesome' // eslint-disable-line import/no-unassigned-import

import loading from './loading'
import barba from './barba'
import nav from './nav'

loading.then(() => {
  nav.animation()
  barba.start()
})
