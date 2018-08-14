const $nav = document.getElementById('nav')
const $socials = $nav.querySelector('.menu')
let before

function linkStop(stop = true) {
  if (stop) {
    $socials.classList.add('disable')
  } else {
    $socials.classList.remove('disable')
  }
}
function moved(target) {
  if (before) {
    $socials.classList.remove(before)
  }
  $socials.classList.add((before = target))
}

export default { $nav, linkStop, moved }
