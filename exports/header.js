import SimplexNoise from 'simplex-noise'
let noise
const waveMax = 600 * 20
let wave = 0,
	firstHue
export default {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	init(ctx) {
		noise = new SimplexNoise(Math.random())
		ctx.lineWidth = 0.1
		wave = 0
		firstHue = Math.random() * 360
		ctx.globalCompositeOperation = 'xor'
	},
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx context
	 */
	render(ctx) {
		if (waveMax < wave) return
		const width = ctx.canvas.width,
			height = ctx.canvas.height
		const spacing = width / 80
		for (let i = 0; i < 1 + 10 * (1 - wave / waveMax); i++) {
			let x = -(wave * 0.025)
			const hue = firstHue + wave * 0.025
			const lig = Math.abs(Math.cos(wave * 0.01)) * 10 + 60
			ctx.strokeStyle = `hsla(${hue}deg,100%,${lig}%,.5)`
			ctx.beginPath()
			ctx.moveTo(0, height / 2)
			while (x <= width + 45) {
				const ny = Math.pow(
					noise.noise2D((x / width) * 4, wave / 5000),
					1
				)
				const fc = Math.pow(
					1 - Math.abs(x - width / 2) / (width / 2),
					3
				)
				ctx.lineTo(x, height / 2 - ny * fc * height * 0.25)
				x += spacing
			}
			ctx.stroke()
			wave++
		}
	},
}
