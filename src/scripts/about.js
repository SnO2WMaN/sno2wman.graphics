import Masonry from "masonry-layout";

export default {
	loaded() {
		const $about = document.querySelector("#about");
		const $wraps = $about.querySelector(".wraps");

		new Masonry($wraps, {
			itemSelector: ".wrap",
			columnWidth: ".wrap-sizer",
			gutter: Number(
				getComputedStyle(document.documentElement)
					.getPropertyValue("--about-wrap-margin")
					.slice(0, -2)
			)
		});
	}
};
