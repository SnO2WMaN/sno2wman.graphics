import Masonry from "masonry-layout";

const $about = document.querySelector("#about");
const $wraps = $about.querySelector(".wraps");

new Promise(resolve => {
	window.addEventListener("load", () => {
		resolve();
	});
}).then(() => {
	const style = getComputedStyle(document.documentElement);

	new Masonry($wraps, {
		itemSelector: ".wrap",
		columnWidth: ".wrap-sizer",
		gutter: Number(
			style.getPropertyValue("--about-wrap-margin").slice(0, -2)
		)
	});
});
