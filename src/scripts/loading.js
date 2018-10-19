import imagesLoaded from 'imagesloaded'
import fontsPromise from './fonts'
import fontAwesomePromise from './fontawesome'

const debug = process.env.NODE_ENV === 'development'

const $root = document.getElementsByTagName('body')[0]
const $loading = document.getElementById('loading')

const $bgRects = $loading.querySelector('.bg > .rect')
const $button = $loading.querySelector('.button')

const $info = $loading.querySelector('.info')
const $infoParticles = $info.querySelector('.particles > .data')

/**
 * Particle
 */
const $canvas = $loading.querySelector('canvas')
const $clicker = $loading.querySelector('.clicker')
let particles = []
class Particle {
	/**
	 *
	 * @param {Number} x Coordinate of X
	 * @param {Number} y Coordinate of Y
	 */
	constructor(x, y) {
		// size
		this.r = Math.random() * 18 + 3
		this.rv = -0.125 * Math.random()
		this.x = x + (Math.random() - 0.5) * this.r * 2
		this.y = y + (Math.random() - 0.5) * this.r * 2

		// speed
		this.vMax = Math.random() * 4 + 3
		this.v = Math.random() * this.vMax
		this.a = Math.random() * 0.38
		this.j = -0.002 * this.r

		// color
		this.hue = Math.random() * 360

		// direction
		const d = Math.random() * 2 * Math.PI
		this.cos = Math.cos(d)
		this.sin = Math.sin(d)
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D } ctx Canvas Rendering Context 2D
	 */
	step(ctx) {
		ctx.fillStyle = `hsla(${this.hue},75%,76%,${Math.sqrt(
			this.v / this.vMax
		)})`
		ctx.beginPath()
		ctx.arc(this.x, this.y, Math.abs(this.r), 0, 2 * Math.PI)
		ctx.fill()
		ctx.closePath()

		this.x += this.cos * this.v
		this.y += this.sin * this.v

		this.a += this.j
		this.v += this.a

		this.r += this.rv
	}
	/**
	 * @returns {Boolean} Is particle alive
	 */
	isAlive() {
		return this.v >= 0 && this.r > 1
	}
}

/**
 * Button Click
 */
$button.addEventListener('click', e => {
	if (!$button.classList.contains('active')) {
		return
	}
	if ($loading.classList.contains('clicked')) {
		return
	}
	$loading.classList.add('clicked')
	addParticles(e.clientX, e.clientY)

	$bgRects.addEventListener('transitionend', dispose)
})
$clicker.addEventListener('click', e => {
	addParticles(e.clientX, e.clientY)
})
function addParticles(x, y) {
	for (let i = 0; i < Math.ceil(Math.random() * 60 + 40); i++) {
		particles.push(new Particle(x, y))
	}
}

/**
 * Resize
 */
window.addEventListener('resize', () => {
	$canvas.width = $canvas.clientWidth
	$canvas.height = $canvas.clientHeight
})

/**
 * Draw
 */
let raf
function draw() {
	const ctx = $canvas.getContext('2d')
	ctx.clearRect(0, 0, $canvas.width, $canvas.height)
	ctx.globalCompositeOperation = 'hard-light'
	particles = particles.filter(particle => particle.isAlive())
	if (!$loading.classList.contains('clicked') && Math.random() < 0.25) {
		particles.push(
			new Particle(
				$canvas.clientWidth * Math.random(),
				$canvas.clientHeight * Math.random()
			)
		)
	}
	particles.forEach(particle => {
		particle.step(ctx)
	})
	// Info
	$infoParticles.innerHTML = `${particles.length}`.padStart(4, '0')
	raf = requestAnimationFrame(draw)
}
raf = requestAnimationFrame(draw)

/**
 * Loading
 */
Promise.all([
	new Promise(resolve => {
		setTimeout(resolve, 500)
	}),
	new Promise(resolve => {
		imagesLoaded($root, { background: true }, resolve)
	}),
	fontsPromise,
	fontAwesomePromise,
]).then(() => {
	$button.classList.add('active')
})

/**
 * Dispose
 */

function dispose() {
	cancelAnimationFrame(raf)
	$loading.style.display = 'none'
}

if (debug) {
	dispose()
}
