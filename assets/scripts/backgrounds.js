import * as tileGame from './tile-game';
import * as eina from './eina';
import * as multiple from './multiple';

let timeout;

const backgroundIllustration = document.querySelector('.background-illustration'),
			backgroundTransition = 300; // change in css as well!

export function defaultInit() {
	backgroundIllustration.classList.remove('hide');

	backgroundIllustration.innerHTML = '<div class="dots-wrapper"></div><div class="dots-wrapper__border"></div>';

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

export function multipleInit() {
	defaultDestroy()
	setTimeout(() => {
		multiple.init(backgroundIllustration, backgroundTransition);
	}, backgroundTransition);
}

export function multipleDestroy() {
	backgroundIllustration.classList.add('hide');
	setTimeout(() => {
		multiple.destroy(backgroundIllustration);
		defaultInit();
	}, backgroundTransition);
}