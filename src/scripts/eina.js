let timeout;

function getRandomCoords() {
	return [Math.random() * 80 - 40, Math.random() * 60 - 30]; // [x, y]
}

function appendDiv(wrapper) {
	timeout = setTimeout(() => {
		let coords = getRandomCoords();
		wrapper.style.top = coords[0] + '%';
		wrapper.style.left = coords[1] + '%';
		appendDiv(wrapper);
	}, 500);
}


export function init(backgroundIllustration, backgroundTransition) {
	backgroundIllustration.classList.remove('hide');

	backgroundIllustration.innerHTML = '<div class="eina-wrapper"><div class="n w"></div><div class="n e"></div><div class="s w"></div><div class="s e"></div></div>';

	// appendDiv(backgroundIllustration.querySelector('.eina-wrapper'));
}

export function destroy(backgroundIllustration) {
	clearTimeout(timeout);
	backgroundIllustration.innerHTML = '';
}