import "./index.scss";
import anime from "animejs";

// Icon
import fontawesome from "@fortawesome/fontawesome";
import faTwitter from "@fortawesome/fontawesome-free-brands/faTwitter";
import faGithub from "@fortawesome/fontawesome-free-brands/faGithub";
import faSteam from "@fortawesome/fontawesome-free-brands/faSteam";
import faDiscord from "@fortawesome/fontawesome-free-brands/faDiscord";
import faAmazon from "@fortawesome/fontawesome-free-brands/faAmazon";
import faRss from "@fortawesome/fontawesome-free-solid/faRss";

import iconSnO2WMaN from "./icons/sno2wman.svg";
import iconQiita from "./icons/qiita.svg";
import iconPixivFanbox from "./icons/pixiv_fanbox_1.svg";

import WebFont from "webfontloader";

fontawesome.library.add(faTwitter, faGithub, faSteam, faDiscord, faAmazon);
fontawesome.library.add(faRss);
Array.from(document.querySelectorAll("i.icon")).forEach($icon => {
	const classList = $icon.classList;
	const $parentEl = $icon.parentElement;
	$parentEl.removeChild($icon);
	Object.entries({
		qiita: iconQiita,
		"pixiv-fanbox": iconPixivFanbox,
		sno2wman: iconSnO2WMaN
	}).forEach(entry => {
		if (classList.contains(entry[0])) {
			$parentEl.innerHTML = entry[1] + $parentEl.innerHTML;
		}
	});
});

// Animetion
const $wraps = Array.from(document.querySelectorAll(".contents > .wrap"));
const $wrap1 = $wraps[0]; // Basic
const $wrap2 = $wraps[1]; // Links
const $wrap3 = $wraps[2]; // Skills
const $wrap4 = $wraps[3]; // Donation

const animate = () => {
	anime({
		targets: $wrap1
			.querySelector(".icon-wrap > svg")
			.querySelectorAll("path,circle"),
		duration: 1500,
		delay: (el, i) => i * 100,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: "easeInOutQuint"
	});
};

WebFont.load({
	google: {
		families: ["IBM Plex Sans:400,500", "IBM Plex Sans Condensed"]
	},
	active() {
		animate();
	}
});
