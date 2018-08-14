import { dom, library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope,
  faCopy,
  faExternalLinkAlt,
  faMars,
  faBirthdayCake,
  faClock,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faTumblr,
  faTwitch,
  faSpotify,
  faDiscord,
  faGithub,
  faSteam,
  faDribbble,
  faBehance,
  faYoutube,
  faSoundcloud,
  faMastodon,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  // solid
  faEnvelope,
  faCopy,
  faExternalLinkAlt,
  faMars,
  faBirthdayCake,
  faClock,
  faUmbrellaBeach,
  // bland
  faTwitter,
  faTumblr,
  faTwitch,
  faSpotify,
  faDiscord,
  faGithub,
  faSteam,
  faDribbble,
  faBehance,
  faYoutube,
  faSoundcloud,
  faMastodon
)
dom.watch()
