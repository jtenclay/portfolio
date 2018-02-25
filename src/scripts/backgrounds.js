import * as tileGame from './tile-game';

let timeout;

const backgroundIllustration = document.querySelector('.background-illustration'),
			backgroundTransition = 300; // change in css as well!

export function defaultInit() {
	backgroundIllustration.classList.remove('hide');

	backgroundIllustration.innerHTML = '<div class="dots-wrapper"></div>';

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