import IBackground from "./Ibackground"

import color from "color"

class Particle {
  x: number
  y: number

  v: number
  a: number
  j: number

  r: number

  op: number
  opa: number
  opj: number

  color: color

  sin: number
  cos: number
  constructor(e: {
    // position
    x: number
    y: number
    r: number
    // speed
    v: number
    a: number
    j: number
    // deg
    d: number
    // color
    color: color
    // opacity
    op: number
    opa: number
    opj: number
  }) {
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
        opj: 0,
      },
      e
    )
    // move
    this.x = e.x
    this.y = e.y
    this.r = e.r
    this.v = e.v
    this.a = e.a
    this.j = e.j

    // opacity
    this.op = e.op
    this.opa = e.opa
    this.opj = e.opj

    this.color = e.color

    this.sin = Math.sin(e.d)
    this.cos = Math.cos(e.d)
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = this.color.alpha(this.op).toString()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
  update(rect: { width: number; height: number }): boolean {
    this.a += this.j
    this.a = Math.abs(this.a)
    this.v += this.a
    this.x += this.cos * this.v
    this.y += this.sin * this.v

    this.opa += this.opj
    this.op += this.opa
    return !(
      0 <= this.x + this.r &&
      this.x - this.r <= rect.width &&
      0 <= this.y + this.r &&
      this.y - this.r <= rect.height &&
      0 < this.op
    )
  }
}

export default class ParticleManager implements IBackground {
  rect: {
    width: number
    height: number
  }
  r: number
  color: color
  number: number

  particles: Particle[]

  constructor(
    rect: { width: number; height: number },
    option?: { rad: number; color: color }
  ) {
    this.rect = rect
    option = Object.assign(
      {
        rad: 9,
        color: color("#000"),
      },
      option
    )
    this.r = option.rad
    this.color = option.color
    this.number = Math.floor(
      Math.sqrt((rect.width * rect.height) / 1802060) * 180
    )

    this.particles = []
    for (let i = 0; i < this.number; i++) {
      this.add(false)
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach((p, i) => {
      p.draw(ctx)
      if (p.update(this.rect)) {
        delete this.particles[i]
        this.add(true)
      }
    })
    this.particles = this.particles.filter(Boolean)
  }
  resize(rect: { width: number; height: number }) {
    this.rect = rect
    this.particles = []
    for (let i = 0; i < this.number; i++) {
      this.add(false)
    }
  }

  add(fc: boolean) {
    let x = fc
      ? this.rect.width / 2 + (Math.random() - 0.5) * 10
      : this.rect.width * Math.random()
    let y = fc
      ? this.rect.height / 2 + (Math.random() - 0.5) * 10
      : this.rect.height * Math.random()
    let r = Math.random() * this.r
    this.particles.push(
      new Particle({
        x,
        y,
        r,
        v: Math.random() * 4,
        a: Math.sqrt(1 - r / this.r) * 0.025,
        j: (1 - r / this.r) * -0.003,
        d: Math.atan2(y - this.rect.height / 2, x - this.rect.width / 2),
        color: this.color,
        op: 0,
        opa: (1 - r / this.r) * 0.0075,
        opj: (-r / this.r) * 0.0002,
      })
    )
  }
}
