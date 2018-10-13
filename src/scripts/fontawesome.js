import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
    faTwitter,
    faGithub,
    faDiscord,
    faSpotify,
    faCodepen,
    faSteam,
    faTumblr,
    faMastodon,
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

library.add(
    // BRAND
    faTwitter,
    faGithub,
    faDiscord,
    faSpotify,
    faCodepen,
    faSteam,
    faTumblr,
    faMastodon,
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

dom.i2svg()
