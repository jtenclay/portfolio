import * as tileGame from './tile-game';

const backgroundIllustration = document.querySelector('.background-illustration');

export function defaultInit() {

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

	backgroundIllustration.appendChild(dotsWrapper);

	let dots = document.querySelectorAll('.default-dot');
	function animateDots() {
		dots.forEach((dot) => {
			dot.style.top = parseInt(dot.style.top) + 5 + '%';
			dot.style.left = parseInt(dot.style.left) - 5 + '%';
		});
		//window.requestAnimationFrame(animateDots);
	}

	window.requestAnimationFrame(animateDots);
}

export function defaultDestroy() {
	console.log('destroy default')
}

export function tileGameInit() {
	defaultDestroy()
	tileGame.init(backgroundIllustration);
}

export function tileGameDestroy() {
	tileGame.destroy(backgroundIllustration);
	defaultInit()
}