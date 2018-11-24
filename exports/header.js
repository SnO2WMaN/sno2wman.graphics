let rects = []
let count = 0
let hue = 0

export default {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	init(ctx) {
		count = 0
		rects.length = 0
		const w = ctx.canvas.width,
			h = ctx.canvas.height
		const mw = w,
			mh = h
		hue = Math.random() * 30 + 150
		rects.push([(w - mw) / 2, (h - mh) / 2, mw, mh])
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		switch (Math.floor(Math.random() * 3)) {
			case 0:
				ctx.globalCompositeOperation = 'darken'
				break
			case 1:
				ctx.globalCompositeOperation = 'color-burn'
				break
			case 2:
				ctx.globalCompositeOperation = 'hard-light'
				break
		}
	},
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	render(ctx) {
		if (100 <= count) {
			this.init(ctx)
		}
		if (10 <= count) {
			count++
			return
		}
		count++
		rects.forEach(rect => {
			const trmp = Math.random() * count < 3e-2
			hue += Math.random() * 2
			ctx.fillStyle = `hsla(${hue + (trmp ? 180 : 0)}deg,${
				trmp ? 100 : 70
			}%,${trmp ? 60 : 70 + count}%,${trmp ? 0.75 : 0.25})`
			ctx.fillRect(...rect)
			ctx.lineWidth = 0.1
			ctx.strokeStyle = `#000c`
			ctx.beginPath()
			ctx.rect(...rect)
			ctx.closePath()
			ctx.stroke()
		})
		const del = rects.length
		for (let i = 0; i < del; i++) {
			if (1 - 1e-3 < Math.random() * Math.sqrt(count)) continue
			const x = rects[i][0],
				y = rects[i][1],
				w = rects[i][2],
				h = rects[i][3]
			const spX = Math.random() * 0.8 + 0.1,
				spY = Math.random() * 0.8 + 0.1
			rects.push([x, y, w * spX, h * spY])
			rects.push([x, y + h * spY, w * spX, h * (1 - spY)])
			rects.push([x + w * spX, y, w * (1 - spX), h * spY])
			rects.push([x + w * spX, y + h * spY, w * (1 - spX), h * (1 - spY)])
		}
		rects.splice(0, del)
	},
}
7
