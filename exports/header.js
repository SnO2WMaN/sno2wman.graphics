import SimplexNoise from 'simplex-noise'
let noise

let wave = 0,
	firstHue
const waveMax = 2000
const spacing = 20

export default {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	init(ctx) {
		noise = new SimplexNoise(Math.random())
		ctx.lineWidth = 1
		wave = 0
		firstHue = Math.random() * 360
		ctx.globalCompositeOperation = 'lighten'
	},
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	render(ctx) {
		if (waveMax < wave) return
		const width = ctx.canvas.width,
			height = ctx.canvas.height
		let x = -(wave / waveMax) * spacing
		ctx.strokeStyle = `hsla(${firstHue +
			(3600 * wave) / waveMax}deg,70%,70%,.25)`
		ctx.beginPath()
		ctx.moveTo(0, height / 2)
		while (x <= width + 45) {
			const ny = Math.pow(noise.noise2D((x / width) * 12, wave / 1200), 5)
			const fc = Math.pow(1 - Math.abs(x - width / 2) / (width / 2), 5)
			ctx.lineTo(x, height / 2 - ny * fc * height * 1.5)
			x += spacing
		}
		ctx.stroke()
		wave++
	},
}
