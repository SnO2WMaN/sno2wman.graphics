import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons/faBirthdayCake";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faMars } from "@fortawesome/free-solid-svg-icons/faMars";
import { faDna } from "@fortawesome/free-solid-svg-icons/faDna";

import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faCodepen } from "@fortawesome/free-brands-svg-icons/faCodepen";

import iconSnO2WMaN from "./sno2wman.svg";
import LogoSite from "./logo_site.svg";
import LogoEn from "./logo_en.svg";
import LogoJpEn from "./logo_jpen.svg";

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
);

dom.watch();

Array.from(document.querySelectorAll("i.icon")).forEach($icon => {
	Object.entries({
		sno2wman: iconSnO2WMaN,
		"logo-site": LogoSite,
		"logo-en": LogoEn,
		"logo-jp-en": LogoJpEn
	}).forEach(entry => {
		if ($icon.classList.contains(entry[0]))
			$icon.insertAdjacentHTML("afterend", entry[1]);
	});
	$icon.remove();
});
