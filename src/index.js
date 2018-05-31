import "./index.scss";
import anime from "animejs";

// Icon
import iconSnO2WMaN from "./icons/sno2wman.svg";
import iconQiita from "./icons/qiita.svg";
import iconPixivFanbox from "./icons/pixiv_fanbox_1.svg";
import fontawesome from "@fortawesome/fontawesome";
import faTwitter from "@fortawesome/fontawesome-free-brands/faTwitter";
import faGithub from "@fortawesome/fontawesome-free-brands/faGithub";
import faSteam from "@fortawesome/fontawesome-free-brands/faSteam";
import faDiscord from "@fortawesome/fontawesome-free-brands/faDiscord";
import faAmazon from "@fortawesome/fontawesome-free-brands/faAmazon";
import faRss from "@fortawesome/fontawesome-free-solid/faRss";

fontawesome.library.add(faTwitter, faGithub, faSteam, faDiscord, faAmazon);
fontawesome.library.add(faRss);
Array.from(document.querySelectorAll("i.icon")).forEach($icon => {
	const classList = $icon.classList;
	const $parentEl = $icon.parentElement;
	if (classList.contains("qiita")) {
		$parentEl.innerHTML = iconQiita;
	} else if (classList.contains("pixiv-fanbox")) {
		$parentEl.innerHTML = iconPixivFanbox;
	} else if (classList.contains("sno2wman")) {
		$parentEl.innerHTML = iconSnO2WMaN;
	}
});

anime({
	targets: document
		.querySelector(".wrap > .icon-wrap > svg")
		.querySelectorAll("path,circle"),
	duration: 1500,
	delay: (el, i) => i * 100,
	strokeDashoffset: [anime.setDashoffset, 0],
	easing: "easeInOutQuint"
});
