import { library, dom } from "@fortawesome/fontawesome-svg-core"
import {
  faBirthdayCake,
  faMapMarkerAlt,
  faMars,
  faDna,
} from "@fortawesome/free-solid-svg-icons"
import {
  faTwitter,
  faGithub,
  faDiscord,
  faSteam,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons"

import iconSnO2WMaN from "./sno2wman.svg"
import LogoSite from "./logo_site.svg"
import LogoEn from "./logo_en.svg"
import LogoJpEn from "./logo_jpen.svg"

library.add(
  // Icon
  faBirthdayCake,
  faMapMarkerAlt,
  faMars,
  faDna,
  // Brands
  faTwitter,
  faGithub,
  faDiscord,
  faSteam,
  faCodepen
)

export default {
  loaded() {
    // fontawesome 5
    dom.i2svg()

    // own
    Array.from(document.querySelectorAll("i.icon")).forEach($icon => {
      Object.entries({
        sno2wman: iconSnO2WMaN,
        "logo-site": LogoSite,
        "logo-en": LogoEn,
        "logo-jp-en": LogoJpEn,
      }).forEach(entry => {
        if ($icon.classList.contains(entry[0]))
          $icon.insertAdjacentHTML("afterend", entry[1])
      })
      $icon.remove()
    })
  },
}
