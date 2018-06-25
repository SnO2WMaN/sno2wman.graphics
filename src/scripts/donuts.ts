import IBackground from "./Ibackground";

export default class Donuts implements IBackground {
	rect: { width: number; height: number };
	constructor(rect: { width: number; height: number }) {
		this.rect = rect;
	}
	draw(ctx: CanvasRenderingContext2D) {}
	resize(rect: { width: number; height: number }) {}
}
