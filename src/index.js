import "./index.scss";

import color from "color";

import WebFont from "webfontloader";

import icons from "./icons/icons";
import brands from "./brands/brands";

import topNav from "./scripts/top_nav";
import bg from "./scripts/bg";
import voxels from "./voxels/voxels.tsx";
import about from "./scripts/about";

// main
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
			custom: {
				families: ["Noto Sans Japanese:n1,n2,n3,n4,n5,n7,n9"],
				urls: [
					"https://fonts.googleapis.com/earlyaccess/notosansjapanese.css"
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
	document.getElementById("left-nav").classList.add("animated");
	icons.loaded();
	brands.loaded();
	topNav.loaded();
	about.loaded();
	voxels.loaded();
	bg.loaded();
});
