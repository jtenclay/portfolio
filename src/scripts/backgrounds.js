import * as tileGame from './tile-game';
import * as eina from './eina';

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

export function einaInit() {
	defaultDestroy()
	setTimeout(() => {
		eina.init(backgroundIllustration, backgroundTransition);
	}, backgroundTransition);
}

export function einaDestroy() {
	backgroundIllustration.classList.add('hide');
	setTimeout(() => {
		eina.destroy(backgroundIllustration);
		defaultInit();
	}, backgroundTransition);
}