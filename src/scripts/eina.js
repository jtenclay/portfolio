let timeout,
		activeFlag = false;

function getRandomCoords() {
	return [Math.random() * 40 - 20, Math.random() * 20 - 10]; // [x, y]
}

function getRandomTimeout() {
	return Math.random() * 500;
}

function appendDiv(wrapper) {
	timeout = setTimeout(() => {
		let coords = (Math.random() < 0.8) ? [0,0] : getRandomCoords();
		wrapper.style.left = coords[0] + '%';
		wrapper.style.top = coords[1] + '%';
		appendDiv(wrapper);
	}, getRandomTimeout());
}


export function init(backgroundIllustration, backgroundTransition) {
	activeFlag = true;
	backgroundIllustration.classList.remove('hide');

	backgroundIllustration.innerHTML = '<div class="eina-wrapper"><div class="n w"></div><div class="n e"></div><div class="s w"></div><div class="s e"></div></div>';

	let einaWrapper = backgroundIllustration.querySelector('.eina-wrapper');
	appendDiv(einaWrapper);

	einaWrapper.querySelectorAll('div').forEach((el) => {
		el.classList.add('init');
	});

	// pause glitches while letters are in motion
	setTimeout(() => {
		clearTimeout(timeout);
	}, 700);

	// resume glitches after letter stop moving
	setTimeout(() => {
		if (activeFlag) {
			appendDiv(einaWrapper);
		}
	}, 2000);
}

export function destroy(backgroundIllustration) {
	clearTimeout(timeout);
	activeFlag = false;
	backgroundIllustration.innerHTML = '';
}