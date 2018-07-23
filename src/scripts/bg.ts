import color from "color"

import IBackground from "./Ibackground"

import Particles from "./particles"
import Arcs from "./arcs"

const $canvas = document.getElementById("canvas") as HTMLCanvasElement
const $canvasPlaceholder = document.getElementById(
  "canvas-placeholder"
) as HTMLDivElement

let background: IBackground

function loaded() {
  if (!$canvasPlaceholder) throw new DOMException()
  if (!$canvas) throw new DOMException()

  sizing($canvasPlaceholder.getBoundingClientRect())
  const ctx = $canvas.getContext("2d")

  function draw() {
    if (ctx && background) {
      ctx.clearRect(0, 0, $canvas.width, $canvas.height)
      background.draw(ctx)
    }
    requestAnimationFrame(draw)
  }
  requestAnimationFrame(draw)
}
function resized() {
  if (!$canvasPlaceholder) throw new DOMException()
  sizing($canvasPlaceholder.getBoundingClientRect())
}

export default {
  loaded,
  resized,
}

window.addEventListener("resize", () => {
  resized()
})

function sizing(rect: { width: number; height: number }) {
  if (!$canvas) throw new DOMException()
  $canvas.setAttribute("width", `${rect.width}`)
  $canvas.setAttribute("height", `${rect.height}`)
  if (background) background.resize(rect)
}

function change(type: "particle" | "arcs") {
  const list = $canvas.classList
  return new Promise(resolve => {
    if (list.contains("visible")) {
      list.remove("visible")
      $canvas.addEventListener(
        "transitionend",
        () => {
          resolve()
        },
        { once: true }
      )
    } else {
      resolve()
    }
  }).then(() => {
    const rect = $canvasPlaceholder.getBoundingClientRect()
    switch (type) {
      case "particle":
        background = new Particles(rect, {
          rad: 11,
          color: color(
            getComputedStyle(document.documentElement)
              .getPropertyValue("--theme")
              .trim()
          ),
        })
        break
      case "arcs":
        background = new Arcs(rect, {
          color: color(
            getComputedStyle(document.documentElement)
              .getPropertyValue("--theme")
              .trim()
          ),
        })
        break
    }
    return new Promise(resolve => {
      $canvas.classList.remove("visible")
      list.add("visible")
      $canvas.addEventListener(
        "transitionend",
        () => {
          resolve()
        },
        { once: true }
      )
    })
  })
}

export { change }
