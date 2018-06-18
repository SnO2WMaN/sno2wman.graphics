import color from "color";
import "./index.scss";

import iconSnO2WMaN from "./icons/sno2wman.svg";
import LogoSite from "./icons/logo_site.svg";
import LogoEn from "./icons/logo_en.svg";
import LogoJpEn from "./icons/logo_jpen.svg";

Array.from(document.querySelectorAll("i.icon")).forEach($icon => {
	const classList = $icon.classList;
	const $parentEl = $icon.parentElement;
	$parentEl.removeChild($icon);
	Object.entries({
		sno2wman: iconSnO2WMaN,
		"logo-site": LogoSite,
		"logo-en": LogoEn,
		"logo-jp-en": LogoJpEn
	}).forEach(entry => {
		if (classList.contains(entry[0])) {
			$parentEl.innerHTML = entry[1] + $parentEl.innerHTML;
		}
	});
});

window.onload = function() {
	const $canvas = document.querySelector("canvas");
	const $canvasPlaceholder = document.getElementById("canvas-placeholder");
	const ctx = $canvas.getContext("2d");

	let width, height;
	$canvas.setAttribute("width", (width = $canvasPlaceholder.offsetWidth));
	$canvas.setAttribute("height", (height = $canvasPlaceholder.offsetHeight));

	const theme = getComputedStyle(document.documentElement)
		.getPropertyValue("--theme")
		.trim();

	let pSystem = new ParticleSystem(width, height, 100, {
		color: color(theme)
	});

	function draw(c) {
		ctx.clearRect(0, 0, width, height);

		pSystem.draw(ctx);

		requestAnimationFrame(draw);
	}
	requestAnimationFrame(draw);
};

class ParticleSystem {
	constructor(width, height, number, e) {
		this.width = width;
		this.height = height;
		e = Object.assign(
			{
				r: 2,
				v: 6,
				a: 0.05,
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
			? this.width / 2 + Math.random() - 0.5
			: this.width * Math.random();
		let y = fc
			? this.height / 2 + Math.random() - 0.5
			: this.height * Math.random();
		let r = Math.random() * this.r;
		this.particles.push(
			new Particle({
				x,
				y,
				r,
				v: Math.random() * this.v,
				a: Math.sqrt(1 - r / this.r) * this.a,
				d: Math.atan2(y - this.height / 2, x - this.width / 2),
				color: this.color
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
				j: -0.0001,
				color: color("#000"),
				op: 0,
				opa: 0.005,
				opj: -0.000015
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
