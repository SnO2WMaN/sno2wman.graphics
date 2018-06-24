import color from "color";

const theme = color(
	getComputedStyle(document.documentElement).getPropertyValue("--theme")
);
const bg = color(
	getComputedStyle(document.documentElement).getPropertyValue("--bg")
);

export { theme, bg };
