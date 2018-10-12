const $loading = document.getElementById('loading')
const $button = $loading.querySelector('.button')

const $info = $loading.querySelector('.info')
const $infoParticles = $info.querySelector('.particles > .data')

// canvas
const $canvas = $loading.querySelector('canvas')
const $clicker = $loading.querySelector('.clicker')
let particles = []
class Particle {
    /**
     *
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        // size
        this.r = Math.random() * 18 + 3
        this.rv = -0.125 * Math.random()
        this.x = x + (Math.random() - 0.5) * this.r * 2
        this.y = y + (Math.random() - 0.5) * this.r * 2

        // speed
        this.vMax = Math.random() * 8 + 3
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
     * @param {CanvasRenderingContext2D } ctx
     */
    step(ctx) {
        ctx.fillStyle = `hsla(${this.hue},75%,76%,${Math.sqrt(
            this.v / this.vMax
        )})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.abs(this.r), 0, 2 * Math.PI)
        ctx.fill()

        this.x += this.cos * this.v
        this.y += this.sin * this.v

        this.a += this.j
        this.v += this.a

        this.r += this.rv
    }
    /**
     * @returns Boolean
     */
    isAlive() {
        return 0 <= this.v && 1 < this.r
    }
}

$button.addEventListener('click', e => {
    if ($loading.classList.contains('clicked')) return
    $loading.classList.add('clicked')
    addParticles(e.clientX, e.clientY)
})
$clicker.addEventListener('click', e => {
    addParticles(e.clientX, e.clientY)
})
function addParticles(x, y) {
    for (let i = 0; i < Math.ceil(Math.random() * 60 + 40); i++) {
        particles.push(new Particle(x, y))
    }
}

window.addEventListener('resize', () => {
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
})
window.dispatchEvent(new Event('resize'))

function draw() {
    const ctx = $canvas.getContext('2d')
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    ctx.globalCompositeOperation = 'hard-light'
    particles = particles.filter(particle => particle.isAlive())
    particles.forEach(particle => {
        particle.step(ctx)
    })
    if (!$loading.classList.contains('clicked') && Math.random() < 0.25) {
        particles.push(
            new Particle(
                $canvas.width * Math.random(),
                $canvas.height * Math.random()
            )
        )
    }
    // Info
    $infoParticles.innerHTML = `${particles.length}`.padStart(4, '0')
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
