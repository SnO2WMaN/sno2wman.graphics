/* eslint-disable import/max-dependencies */
import { library, dom } from '@fortawesome/fontawesome-svg-core'
/*
import {
	faTwitter,
	faGithub,
	faDiscord,
	faSpotify,
	faCodepen,
	faSteam,
	faTumblr,
	faTwitch,
} from '@fortawesome/free-brands-svg-icons'

import {
	faEnvelope,
	faMars,
	faBirthdayCake,
	faUmbrellaBeach,
	faPastafarianism,
	faClock,
	faFistRaised,
	faExternalLinkAlt,
	faClipboard,
} from '@fortawesome/free-solid-svg-icons'
*/

import faTwitter from '@fortawesome/free-brands-svg-icons/faTwitter'
import faGithub from '@fortawesome/free-brands-svg-icons/faGithub'
import faDiscord from '@fortawesome/free-brands-svg-icons/faDiscord'
import faSpotify from '@fortawesome/free-brands-svg-icons/faSpotify'
import faCodepen from '@fortawesome/free-brands-svg-icons/faCodepen'
import faTumblr from '@fortawesome/free-brands-svg-icons/faTumblr'
import faSteam from '@fortawesome/free-brands-svg-icons/faSteam'
import faTwitch from '@fortawesome/free-brands-svg-icons/faTwitch'

import faEnvelope from '@fortawesome/free-solid-svg-icons/faEnvelope'
import faMars from '@fortawesome/free-solid-svg-icons/faMars'
import faBirthdayCake from '@fortawesome/free-solid-svg-icons/faBirthdayCake'
import faUmbrellaBeach from '@fortawesome/free-solid-svg-icons/faUmbrellaBeach'
import faPastafarianism from '@fortawesome/free-solid-svg-icons/faPastafarianism'
import faClock from '@fortawesome/free-solid-svg-icons/faClock'
import faFistRaised from '@fortawesome/free-solid-svg-icons/faFistRaised'
import faExternalLinkAlt from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'
import faClipboard from '@fortawesome/free-solid-svg-icons/faClipboard'

library.add(
	// BRAND
	faTwitter,
	faGithub,
	faDiscord,
	faSpotify,
	faCodepen,
	faSteam,
	faTumblr,
	faTwitch,
	// SOLID
	faEnvelope,
	faMars,
	faBirthdayCake,
	faClock,
	faUmbrellaBeach,
	faPastafarianism,
	faFistRaised,
	faExternalLinkAlt,
	faClipboard
)

export default new Promise(resolve => {
	dom.i2svg({ callback: resolve })
})
