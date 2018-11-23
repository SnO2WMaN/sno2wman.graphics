const ws = []

export default {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	init(ctx) {
		ctx.globalCompositeOperation = 'lighter'
		ws.length = 0
		const mx = Math.sqrt(
			Math.pow(ctx.canvas.width / 2, 2) +
				Math.pow(ctx.canvas.height / 2, 2)
		)
		let r = 2
		let b = 1
		while (r <= mx) {
			ws.push({
				r,
				b,
				s: Math.random() * 2 * Math.PI,
				w: Math.random() * Math.PI * (1 - r / mx),
				v: (Math.random() - 0.5) * 0.005 * Math.pow(1 - r / mx, 3),
				op: Math.pow(r / mx, 1.5),
				hue: (1 - r / mx) * 80 + 168,
				lig: 20 + Math.pow(r / mx, 2) * 50,
			})
			if (0.85 < Math.random()) {
				r += b
				b = Math.floor(Math.random() * 40) + 4
			}
		}
	},
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	render(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		for (let i = 0; i < ws.length - 1; i++) {
			ctx.beginPath()
			ctx.strokeStyle = `hsla(${ws[i].hue},90%,${ws[i].lig}%,${ws[i].op})`
			ctx.lineWidth = ws[i].b
			ctx.arc(
				ctx.canvas.width / 2,
				ctx.canvas.height / 2,
				ws[i].r,
				(ws[i].s += ws[i].v),
				ws[i].s + ws[i].w,
				false
			)
			ctx.stroke()
			ctx.closePath()
		}
	},
}
