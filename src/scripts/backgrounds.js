import * as tileGame from './tile-game';

let timeout;

const backgroundIllustration = document.querySelector('.background-illustration'),
			backgroundTransition = 200; // change in css as well!

export function defaultInit() {
	setTimeout(() => {
		backgroundIllustration.classList.remove('hide');
	}, backgroundTransition);

	backgroundIllustration.innerHTML = '<div class="dots-mask dots-mask--left"></div><div class="dots-mask dots-mask--right"></div><div class="dots-mask dots-mask--top"></div><div class="dots-mask dots-mask--bottom"></div>';

	let dotsWrapper = document.createElement("div"),
			alternatingRowFlag = true;

	for (let i = 0; i < 95; i = i + 8.66) {
		for (let j = 5; j < 100; j = j + 10) {
			let dot = document.createElement("div");
			dot.style.top = i + '%';
			dot.style.left = (alternatingRowFlag) ? j + '%' : j + 5 + '%';
			dot.className = 'default-dot';
			dotsWrapper.appendChild(dot);
		}
		alternatingRowFlag = !alternatingRowFlag;
	}

	dotsWrapper.className = 'dots-wrapper';
	backgroundIllustration.appendChild(dotsWrapper);

	let dots = document.querySelectorAll('.default-dot');
	function animateDots() {
		dots.forEach((dot) => {
			let wrappedTopFlag = false,
					newTop = parseFloat(dot.style.top) + 0.055,
					newLeft = parseFloat(dot.style.left) - 0.15;
			if (newTop >= 100) {
				wrappedTopFlag = true;
				newTop -= 95.26;
			}
			dot.style.top = newTop + '%';
			dot.style.left = (newLeft < 0 ? newLeft + 100 : newLeft) + (wrappedTopFlag ? 5 : 0) + '%';
		});
		timeout = setTimeout(() => {
			animateDots();
		}, 76.6);
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