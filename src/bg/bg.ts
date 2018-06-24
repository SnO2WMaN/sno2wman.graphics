import color from "color";

import { theme } from "../constants";
import ParticleSystem from "./particles";

const $canvas = document.getElementById("canvas") as HTMLCanvasElement;
const $canvasPlaceholder = document.getElementById(
	"canvas-placeholder"
) as HTMLDivElement;
let background: IBackground;

window.addEventListener("load", () => {
	if (!$canvasPlaceholder) throw new DOMException();
	if (!$canvas) throw new DOMException();

	const rect = $canvasPlaceholder.getBoundingClientRect();
	background = new ParticleSystem(rect, {
		rad: 9,
		color: theme
	});

	resized($canvasPlaceholder.getBoundingClientRect());
	const ctx = $canvas.getContext("2d");

	function draw() {
		if (ctx) {
			ctx.clearRect(0, 0, $canvas.width, $canvas.height);
			background.draw(ctx);
			requestAnimationFrame(draw);
		}
	}
	requestAnimationFrame(draw);
});

window.addEventListener("resize", function() {
	if (!$canvasPlaceholder) throw new DOMException();
	resized($canvasPlaceholder.getBoundingClientRect());
});

function resized(rect: { width: number; height: number }) {
	if (!$canvas) throw new DOMException();
	$canvas.setAttribute("width", `${rect.width}`);
	$canvas.setAttribute("height", `${rect.height}`);
	background.resize(rect);
}

export default interface IBackground {
	draw(ctx: CanvasRenderingContext2D): void;
	resize(rect: { width: number; height: number }): void;
}
