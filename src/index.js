import "./index.scss";

import iconSnO2WMaN from "./icons/sno2wman.svg";
import LogoSite from "./icons/logo_site.svg";
import LogoEn from "./icons/logo_en.svg";
import LogoJpEn from "./icons/logo_jpen.svg";

import fontawesome from "@fortawesome/fontawesome";
import regular from "@fortawesome/fontawesome-free-regular";
import solid from "@fortawesome/fontawesome-free-solid";

import WebFont from "webfontloader";

import globalnav from "./globalnav";
import "./particles";

fontawesome.library.add(regular);
fontawesome.library.add(solid);

Array.from(document.querySelectorAll("i.icon")).forEach($icon => {
	const classList = $icon.classList;
	const $parentEl = $icon.parentElement;
	$parentEl.removeChild($icon);
	Object.entries({
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

// main
const $home = document.getElementById("home");
const $left = document.getElementById("left");
const $canvas = document.getElementById("canvas");

window.onscroll = function(e) {};

Promise.all([
	new Promise((resolve, reject) => {
		WebFont.load({
			google: {
				families: [
					"Raleway:600,300,100",
					"Dosis",
					"IBM Plex Sans Condensed:300,400"
				]
			},
			loading: function() {
				resolve();
			},
			inactive: function() {
				reject(new Error("Font Loading Failed"));
			}
		});
	}),
	new Promise(resolve => window.addEventListener("load", resolve))
]).then(() => {
	$canvas.classList.add("animated");
	$left.classList.add("animated");
	globalnav.init();
});
