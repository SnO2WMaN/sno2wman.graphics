import { change } from "./bg"

const $main = document.getElementById("main")
const $globalnav = document.getElementById("top-nav")
const $selected = $globalnav.querySelector(".selected")
const $buttons = $globalnav.querySelectorAll("[data-target]")

const position = {}
let $before, $current
let current = ""
let stopper = false

$buttons.forEach(($button, i) => {
  const target = $button.getAttribute("data-target")
  position[`${target}`] = i
  $button.addEventListener("click", () => {
    transit(target, false)
  })
})

function transit(target) {
  if (stopper) return
  if (target === current) return
  stopper = true
  current = target
  history.replaceState({ target }, `page ${target}`, `${target}`)

  $before = $current
  $current = document.getElementById(target)
  const transitPromise = new Promise(resolve => {
    $main.classList.add("animating")
    $main.classList.add("transiting")
    if (!$before) resolve()
    else {
      $before.classList.remove("selected")
      $before.addEventListener(
        "transitionend",
        () => {
          resolve()
        },
        { once: true }
      )
    }
  })
    .then(() => {
      $main.classList.remove("transiting")
      return new Promise(resolve => {
        $current.classList.add("selected")
        $current.addEventListener(
          "transitionend",
          () => {
            resolve()
          },
          { once: true }
        )
      })
    })
    .then(() => {
      if ($current.classList.contains("animated")) {
        return Promise.resolve()
      } else {
        $current.classList.add("animated")
        const promises = []
        $current.querySelectorAll("*").forEach($e => {
          if (window.getComputedStyle($e).animationName !== "none") {
            promises.push(
              new Promise(resolve => {
                $e.addEventListener(
                  "animationend",
                  () => {
                    resolve()
                  },
                  { once: true }
                )
              })
            )
          }
        })
        return Promise.all(promises)
      }
    })
  Promise.all([
    transitPromise,
    new Promise(resolve => {
      $selected.setAttribute("data-current", target)
      $selected.addEventListener(
        "transitionend",
        () => {
          resolve()
        },
        { once: true }
      )
    }),
    change(
      (() => {
        switch (target) {
          case "about":
            return "arcs"
          default:
            return "particle"
        }
      })()
    ),
  ]).then(() => {
    $main.classList.remove("animating")
    stopper = false
  })
}

export default {
  loaded() {
    const path = location.pathname.substr(1)
    if (path === "") {
      transit("home", true)
    } else {
      transit(
        ["home", "about", "works", "voxels", "contact", "system"].includes(path)
          ? path
          : "home",
        true
      )
    }
  },
}
