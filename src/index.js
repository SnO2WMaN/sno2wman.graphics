import "./index.scss";

import WebFont from "webfontloader";

import "./icons/icons";
import topNav from "./scripts/top_nav";
import "./bg/particles";

// main
const $left = document.getElementById("left-nav");
const $canvas = document.getElementById("canvas");

window.onscroll = function(e) {};

document.documentElement.style.visibility = "hidden";
Promise.all([
	new Promise((resolve, reject) => {
		WebFont.load({
			google: {
				families: [
					"Raleway:600,300,100",
					"Dosis:400",
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
	document.documentElement.style.visibility = "visible";

	$canvas.classList.add("animated");
	$left.classList.add("animated");
	topNav.init();
});
