import color from "color";
import { theme } from "./constants";

class ParticleSystem {
	constructor(width, height, number, e) {
		this.width = width;
		this.height = height;
		e = Object.assign(
			{
				r: 9,
				color: color("#000")
			},
			e
		);
		this.r = e.r;
		this.v = e.v;
		this.a = e.a;
		this.color = e.color;

		this.particles = [];
		for (let i = 0; i < number; i++) {
			this.add(false);
		}
	}
	draw(ctx) {
		this.particles.forEach((p, i) => {
			p.draw(ctx);
			if (p.update(this.width, this.height)) {
				delete this.particles[i];
				this.add(true);
			}
		});
		this.particles = this.particles.filter(Boolean);
	}

	add(fc) {
		let x = fc
			? this.width / 2 + (Math.random() - 0.5) * 10
			: this.width * Math.random();
		let y = fc
			? this.height / 2 + (Math.random() - 0.5) * 10
			: this.height * Math.random();
		let r = Math.random() * this.r;
		this.particles.push(
			new Particle({
				x,
				y,
				r,
				v: Math.random() * 4,
				a: Math.sqrt(1 - r / this.r) * 0.025,
				j: (1 - r / this.r) * -0.003,
				d: Math.atan2(y - this.height / 2, x - this.width / 2),
				color: this.color,
				opa: (1 - r / this.r) * 0.0075,
				opj: (-r / this.r) * 0.0002
			})
		);
	}
}
class Particle {
	constructor(e) {
		e = Object.assign(
			{
				x: 0,
				y: 0,
				r: 0,
				d: 0,
				v: 0,
				a: 0,
				j: 0,
				color: color("#000"),
				op: 0,
				opa: 0,
				opj: 0
			},
			e
		);
		// move
		this.x = e.x;
		this.y = e.y;
		this.r = e.r;
		this.d = e.d;
		this.v = e.v;
		this.a = e.a;
		this.j = e.j;

		// opacity
		this.op = e.op;
		this.opa = e.opa;
		this.opj = e.opj;

		this.color = e.color;

		this.sin = Math.sin(this.d);
		this.cos = Math.cos(this.d);
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color.alpha(this.op);
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
	update(w, h) {
		this.a += this.j;
		this.a = Math.abs(this.a);
		this.v += this.a;
		this.x += this.cos * this.v;
		this.y += this.sin * this.v;

		this.opa += this.opj;
		this.op += this.opa;
		return !(
			0 <= this.x + this.r &&
			this.x - this.r <= w &&
			0 <= this.y + this.r &&
			this.y - this.r <= h &&
			0 < this.op
		);
	}
}

let pSystem;
const $canvas = document.getElementById("canvas");
const $canvasPlaceholder = document.getElementById("canvas-placeholder");

window.addEventListener("load", function() {
	const rect = $canvasPlaceholder.getBoundingClientRect();
	resized(rect.width, rect.height);

	const ctx = $canvas.getContext("2d");
	function draw(c) {
		ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		pSystem.draw(ctx);
		requestAnimationFrame(draw);
	}
	requestAnimationFrame(draw);
});

window.addEventListener("resize", function() {
	const rect = $canvasPlaceholder.getBoundingClientRect();
	resized(rect.width, rect.height);
});

function resized(width, height) {
	$canvas.setAttribute("width", width);
	$canvas.setAttribute("height", height);

	pSystem = new ParticleSystem(
		width,
		height,
		Math.sqrt((width * height) / 1802060) * 180,
		{
			color: theme
		}
	);
}
