const $transitWrap = document.getElementById('transit')
const $terminal = $transitWrap.querySelector('.terminal')

function appear() {
  $transitWrap.classList.add('visible')
}
function disappear() {
  $transitWrap.classList.remove('visible')
}

function clear() {
  $terminal.querySelectorAll(':not(.fix)').forEach($text => {
    $text.remove()
  })
}

function addProgressBar(name, length) {
  let i = -1
  const barLength = Math.ceil(length / 1.6)
  const $line = document.createElement('p')
  $terminal.appendChild($line)
  const progress = function() {
    i++
    const barFull = '#'.repeat(Math.floor((i / length) * barLength))
    const spaceFull = '-'.repeat(barLength - barFull.length)
    $line.innerText = `${name} [${barFull}${spaceFull}] ${i}/${length}`
  }
  progress()
  return progress
}

function addLine(text) {
  const $line = document.createElement('p')
  $line.innerText = text
  $terminal.appendChild($line)
}

export default {
  appear,
  disappear,
  clear,
  addLine,
  addProgressBar,
}
