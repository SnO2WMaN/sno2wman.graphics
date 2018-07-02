import IBackground from "./Ibackground";

import color from "color";

class Arc {
	centerX: number;
	centerY: number;

	rad: number;
	width: number;
	angle: number;
	color: color;

	start: number;
	v: number;
	constructor(
		centerX: number,
		centerY: number,
		radius: number,
		width: number,
		color: color,
		angle: number,
		op: number
	) {
		this.centerX = centerX;
		this.centerY = centerY;

		this.rad = radius;
		this.width = width;
		this.angle = angle;

		this.color = color.alpha(op);

		this.start = Math.random() * 2 * Math.PI;
		this.v = (Math.random() - 0.5) / 1000;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.strokeStyle = this.color.toString();
		ctx.lineWidth = this.width;
		ctx.beginPath();
		ctx.arc(
			this.centerX,
			this.centerY,
			this.rad,
			this.start,
			this.start + this.angle,
			false
		);
		ctx.stroke();
	}

	update(): boolean {
		this.start += this.v;
		return false;
	}
}

export default class Donuts implements IBackground {
	rect: { width: number; height: number };
	color: color;
	arcs: Arc[];

	constructor(
		rect: { width: number; height: number },
		option: { color: color }
	) {
		this.rect = rect;
		this.color = option.color;
		this.arcs = [];
		let i: number = 0;
		let wmax = 5;
		let rmax = Math.sqrt(
			Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
		);
		for (let r = 0; r < rmax; r += i = Math.random() * wmax + 1) {
			this.arcs.push(
				new Arc(
					rect.width / 2,
					rect.height / 2,
					r,
					i,
					this.color.lighten(4 * Math.random()),
					Math.random() * Math.PI * 0.5 * (1 - i / (wmax + 1)),
					Math.random() * (1 - Math.sqrt(r / rmax)) * 0.8
				)
			);
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.arcs.forEach((arc, i) => {
			arc.draw(ctx);
			if (arc.update()) {
				delete this.arcs[i];
			}
		});
		this.arcs = this.arcs.filter(Boolean);
	}
	resize(rect: { width: number; height: number }) {}
}
