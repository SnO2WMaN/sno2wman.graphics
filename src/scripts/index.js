import './loading' // eslint-disable-line import/no-unassigned-import

import ClipboardJS from 'clipboard'

const clipboard = new ClipboardJS('.clipboard')
clipboard.on('success', e => {
	alert(e.text) // eslint-disable-line no-alert
})
