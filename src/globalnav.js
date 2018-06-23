import anime from "animejs";

const $globalnav = document.getElementById("globalnav");
const $selected = $globalnav.querySelector(".selected");
const $buttons = $globalnav.querySelectorAll("[data-target]");

const position = {};
let $before, $current;
let current = "";
let stopper = false;

$buttons.forEach(($button, i) => {
	const target = $button.getAttribute("data-target");
	position[`${target}`] = i;
	$button.addEventListener("click", () => {
		transit(target, false);
	});
});

function transit(target, init) {
	if (stopper) return;
	if (target === current) return;
	current = target;
	history.replaceState({ target }, `page ${target}`, `${target}`);

	$before = $current;
	if ($before) $before.classList.remove("selected");
	$current = document.getElementById(target);
	$current.classList.add("selected");
	$current.classList.add("animated");

	$current.addEventListener("transitionend", () => {
		const scrolling = document.scrollingElement;
		scrolling.scrollTo(0, 0);
	});

	$current.classList.add("animated");
	stopper = true;

	Promise.all([
		anime({
			targets: $selected,
			translateX: position[target] * $buttons[0].clientWidth,
			duration: init ? 0 : 1000,
			easing: "easeOutCubic"
		}).finished
	]).then(() => {
		stopper = false;
	});
}

export default {
	init() {
		if (!(history.state && history.state.hasOwnProperty("target"))) {
			transit("home");
		} else {
			const target = history.state.target;
			transit(
				["home", "profile", "works", "voxel", "contact"].includes(
					target
				)
					? target
					: "home",
				true
			);
		}
	}
};
