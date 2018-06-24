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
	stopper = true;
	current = target;
	history.replaceState({ target }, `page ${target}`, `${target}`);

	$before = $current;
	$current = document.getElementById(target);
	const transitPromise = new Promise(resolve => {
		if (!$before) resolve();
		else {
			$before.classList.remove("selected");
			$before.addEventListener(
				"transitionend",
				() => {
					resolve();
				},
				{ once: true }
			);
		}
	})
		.then(() => {
			return new Promise(resolve => {
				$current.style.top = "";
				$current.classList.add("selected");
				$current.addEventListener(
					"transitionend",
					() => {
						resolve();
					},
					{ once: true }
				);
			});
		})
		.then(() => {
			if ($current.classList.contains("animated")) {
				return Promise.resolve();
			} else {
				document.scrollingElement.scrollTo(0, 0);
				$current.classList.add("animated");
				const promises = [];
				$current.querySelectorAll("*").forEach($e => {
					if (window.getComputedStyle($e).animationName !== "none") {
						promises.push(
							new Promise(resolve => {
								$e.addEventListener("animationend", () => {
									resolve();
								});
							})
						);
					}
				});
				return Promise.all(promises);
			}
		});
	Promise.all([
		transitPromise,
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
