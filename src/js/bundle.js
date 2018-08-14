import './fontawesome' // eslint-disable-line import/no-unassigned-import

import loading from './loading'
import barba from './barba'

loading.then(() => {
  barba.start()
})
