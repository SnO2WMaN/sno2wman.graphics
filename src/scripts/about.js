import Masonry from "masonry-layout";
import Clipboard from "clipboard";

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

		new Clipboard($about.querySelectorAll(".links-wrap .clipboard")).on(
			"success",
			e => {
				const $wrap = e.trigger.parentElement.parentElement;
				$wrap.classList.add("copyed");
				setTimeout(() => {
					$wrap.classList.remove("copyed");
				}, 1000);
			}
		);
	}
};
