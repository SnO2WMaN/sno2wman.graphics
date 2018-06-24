import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons/faBirthdayCake";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faMars } from "@fortawesome/free-solid-svg-icons/faMars";

import iconSnO2WMaN from "./sno2wman.svg";
import LogoSite from "./logo_site.svg";
import LogoEn from "./logo_en.svg";
import LogoJpEn from "./logo_jpen.svg";

library.add(faBirthdayCake, faMapMarkerAlt, faMars);

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
