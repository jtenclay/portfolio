import * as tileGame from './tile-game';

let timeout;

const backgroundIllustration = document.querySelector('.background-illustration'),
			backgroundTransition = 200; // change in css as well!

export function defaultInit() {
	setTimeout(() => {
		backgroundIllustration.classList.remove('hide');
	}, backgroundTransition);

	backgroundIllustration.innerHTML = '<div class="dots-mask dots-mask--left"></div><div class="dots-mask dots-mask--right"></div><div class="dots-mask dots-mask--top"></div><div class="dots-mask dots-mask--bottom"></div>';

	let dotsWrapper = document.createElement("div");

	for (let i = 0; i < 100; i = i + 10) {
		for (let j = 5; j < 100; j = j + 10) {
			let dot = document.createElement("div");
			dot.style.top = i + '%';
			dot.style.left = j + '%';
			dot.className = 'default-dot';
			dotsWrapper.appendChild(dot);
		}
	}

	dotsWrapper.className = 'dots-wrapper';
	backgroundIllustration.appendChild(dotsWrapper);

	let dots = document.querySelectorAll('.default-dot');
	function wrapAround(num) {
		switch (true) {
			case num < 0:
				return num + 100;
				break;
			case num >= 100:
				return num - 100;
				break;
			default:
				return num;
		}
	}
	function animateDots() {
		dots.forEach((dot) => {
			dot.style.top = wrapAround(parseFloat(dot.style.top) + 0.055) + '%';
			dot.style.left = wrapAround(parseFloat(dot.style.left) - 0.15) + '%';
		});
		timeout = setTimeout(() => {
			animateDots();
		}, 16.6);
	}
	animateDots();

}

export function defaultDestroy() {
	backgroundIllustration.classList.add('hide');
	setTimeout(() => {
		backgroundIllustration.innerHTML = '';
	}, backgroundTransition);
}

export function tileGameInit() {
	defaultDestroy()
	setTimeout(() => {
		tileGame.init(backgroundIllustration, backgroundTransition);
	}, backgroundTransition);
}

export function tileGameDestroy() {
	backgroundIllustration.classList.add('hide');
	setTimeout(() => {
		tileGame.destroy(backgroundIllustration);
		defaultInit();
	}, backgroundTransition);
}