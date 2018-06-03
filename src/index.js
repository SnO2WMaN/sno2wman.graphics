import "./index.scss";
import anime from "animejs";
import Clipboard from "clipboard";

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
import LogoSite from "./icons/logo_site.svg";
import LogoEn from "./icons/logo_en.svg";
import LogoJpEn from "./icons/logo_jpen.svg";

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
		sno2wman: iconSnO2WMaN,
		"logo-site": LogoSite,
		"logo-en": LogoEn,
		"logo-jp-en": LogoJpEn
	}).forEach(entry => {
		if (classList.contains(entry[0])) {
			$parentEl.innerHTML = entry[1] + $parentEl.innerHTML;
		}
	});
});

// Clipboard
new Clipboard(".clipboard", {
	text: function(el) {
		return el.getAttribute("text");
	}
});

// Animetion
const $caution = document.getElementById("caution");
const $loading = document.getElementById("loading");
const $main = document.getElementById("main");

console.log($main);

const $mainWrap = $main.querySelector(".contents > .wrap.main"); // Basic
const $linksWraps = $main.querySelectorAll(".contents > .wrap.links"); // Links
const $bioWraps = $main.querySelector(".contents > .wrap.bio"); // Links

const mainAnimate = () => {
	// Main
	anime
		.timeline()
		.add({
			targets: Array.from(
				$mainWrap.querySelectorAll(".icon-wrap > .cover")
			),
			duration: 1500,
			delay: (el, i) => i * 100,
			easing: "easeInOutQuint",
			scale: [0, 1]
		})
		.add({
			targets: $mainWrap
				.querySelector(".icon-wrap > svg")
				.querySelectorAll("path,circle"),
			duration: 1500,
			delay: (el, i) => i * 50,
			offset: 500,
			easing: "easeInOutQuint",
			strokeDashoffset: [anime.setDashoffset, 0],
			opacity: [0.5, 1],
			scaleY: {
				value: [0.9, 1],
				easing: "easeInOutCubic"
			}
		});
	Array.from($mainWrap.querySelectorAll(".title-wrap > .title")).forEach(
		($title, index) => {
			const duration = 650;
			anime
				.timeline({
					targets: $title.querySelectorAll(".cover"),
					duration
				})
				.add({
					duration: 1000 + index * 100
				})
				.add({
					easing: "easeInExpo",
					translateX: [`${-101}%`, 0],
					delay: (el, i) => (i % 2) * 50
				})
				.add({
					easing: "easeOutExpo",
					translateX: [0, `${101}%`],
					delay: (el, i) => ((i + 1) % 2) * 50
				})
				.add({
					targets: $title.querySelector("p.text"),
					offset: `-=${duration}`,
					duration,
					easing: "easeOutCubic",
					translateX: [`-${5}%`, 0],
					opacity: [0, 1]
				});
		}
	);
	anime({
		targets: $mainWrap.querySelectorAll(".describe-wrap > p.describe"),
		duration: 1000,
		delay: (el, i) => i * 200 + 2000,
		easing: "easeOutCubic",
		translateY: [`${30}%`, 0],
		opacity: [0, 1]
	});
	// Links
	Array.from($linksWraps).forEach(($linksWrap, wrapIndex) => {
		Array.from($linksWrap.querySelectorAll("li.link")).forEach(
			($link, linkIndex) => {
				anime
					.timeline()
					.add({
						targets: $link,
						easing: "easeOutCubic",
						duration: 1500,
						delay: linkIndex * 100 + wrapIndex * 100 + 1000,
						opacity: [0, 1],
						translateY: [`${25}%`, 0]
					})
					.add({
						targets: $link.querySelectorAll(".icon-wrap > .cover"),
						duration: 600,
						easing: "easeInExpo",
						translateX: [`${-100}%`, 0],
						offset: `-=${1000}`
					})
					.add({
						targets: $link.querySelectorAll(".icon-wrap > .cover"),
						duration: 600,
						easing: "easeOutExpo",
						translateX: `${100}%`
					})
					.add({
						targets: $link.querySelectorAll(".icon-wrap > svg"),
						duration: 500,
						offset: `-=${750}`,
						easing: "easeOutCubic",
						translateY: [`${50}%`, 0],
						opacity: [0, 1]
					})
					.add({
						targets: $link.querySelectorAll(".text-wrap > .text"),
						duration: 750,
						offset: `-=${500}`,
						easing: "easeOutQuint",
						translateY: [`${20}%`, 0],
						opacity: [0, 1]
					})
					.finished.then(() => {
						$link.classList.add("animated");
					});
			}
		);
	});
	// Bio
	anime({
		targets: $bioWraps.querySelector(".bio-wrap"),
		duration: 2000,
		delay: 500,
		easing: "easeOutCubic",
		opacity: [0, 1],
		translateY: [`${50}%`, 0]
	});
	anime
		.timeline()
		.add({
			targets: $bioWraps.querySelectorAll(".bio-wrap > .cover"),
			duration: 500,
			delay: (el, i) => {
				return i * 100 + 1500;
			},
			easing: "easeInExpo",
			translateY: [`${100}%`, 0]
		})
		.add({
			targets: $bioWraps.querySelectorAll(".bio-wrap > .cover"),
			duration: 500,
			delay: (el, i) => {
				return ((i + 1) % 2) * 100;
			},
			easing: "easeOutExpo",
			translateY: `${-100}%`
		});
	anime({
		targets: $bioWraps.querySelector(".bio-wrap > .title-wrap > .title"),
		duration: 1200,
		delay: 2000,
		easing: "easeOutQuad",
		opacity: [0, 1],
		translateY: [`${50}%`, 0]
	});
	anime({
		targets: $bioWraps.querySelectorAll(".bio-wrap > .text-wrap > p"),
		duration: 1200,
		easing: "easeOutQuad",
		delay: (el, i) => i * 150 + 2000,
		opacity: [0, 1],
		translateY: [`${50}%`, 0]
	});
};

WebFont.load({
	google: {
		families: ["IBM Plex Sans Condensed:400,700", "Raleway:500"]
	},
	custom: {
		families: ["Noto Sans Japanese:300,700"],
		urls: ["https://fonts.googleapis.com/earlyaccess/notosansjapanese.css"]
	},
	loading() {
		setTimeout(() => {
			anime({
				targets: $loading,
				duration: 750,
				easing: "easeInOutCubic",
				opacity: 0,
				scale: 1.05,
				complete: () => {
					$loading.style.visibility = "hidden";
				}
			});
			mainAnimate();
		}, 1000);
	}
});
