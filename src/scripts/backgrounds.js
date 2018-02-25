import * as tileGame from './tile-game';

export function multipleInit() {
	console.log('multiple init');
}

export function multipleDestroy() {
	console.log('multiple destroyed');
}

export function tileGameInit() {
	tileGame.init();
}

export function tileGameDestroy() {
	tileGame.destroy();
}

