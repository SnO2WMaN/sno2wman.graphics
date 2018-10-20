import ClipboardJS from 'clipboard'

const $profile = document.getElementById('profile')

const $card = $profile.querySelector('.card')
const $social = $card.querySelector('.social')
const clipboard = new ClipboardJS($social.querySelectorAll('.clipboard'))
clipboard.on('success', e => {
	alert(e.text) // eslint-disable-line no-alert
})

const $prof = $card.querySelector('.prof')
const $profTop = $prof.querySelector('.top')
const $profBottom = $prof.querySelector('.bottom')
const $profBottomCanvas = $profBottom.querySelector('canvas')

window.addEventListener('resize', () => {
	$profBottomCanvas.width = $profBottomCanvas.clientWidth
	$profBottomCanvas.height = $profBottomCanvas.clientHeight
})

$card.addEventListener(
	'transitionend',
	() => {
		$social.classList.add('animate')
		$profTop.classList.add('animate')

		$profBottom.addEventListener('scroll', () => {
			const top = $profBottom.scrollTop
			const left = $profBottom.scrollLeft

			$profBottomCanvas.style.top = `${top}px`
			$profBottomCanvas.style.left = `${left}px`

			const scrollPer = 0.9

			const isHorizanotal =
				window.getComputedStyle($profBottom).overflowY === 'hidden'
			;[...$profBottom.querySelectorAll('section')]
				.filter($section => !$section.classList.contains('animate'))
				.forEach($section => {
					if (
						isHorizanotal &&
						$section.offsetLeft <=
							left + $section.offsetWidth * scrollPer
					) {
						$section.classList.add('animate')
					} else if (
						!isHorizanotal &&
						$section.offsetTop <=
							top + $section.offsetHeight * scrollPer
					) {
						$section.classList.add('animate')
					}
				})
		})
		$profBottom.classList.add('scrollable')
		$profBottom.querySelectorAll('section')[0].classList.add('animate')
	},
	{ once: true }
)

export default function start() {
	$card.classList.add('animate')
}
