let timeout,
		staticWrapper,
		dotsArr = [];

class Dot {
	constructor() {
		this.DOM = document.createElement('div');
		this.DOM.className = 'dot';
		this.DOM.style.top = Math.random() * 100 + '%';
		this.DOM.style.left = Math.random() * 100 + '%';
		staticWrapper.appendChild(this.DOM);
		this.timeout = setTimeout(this.setNewDestination, 1000);
	}
	setNewDestination() {
		this.DOM.style.top = Math.random() * 100 + '%';
		this.DOM.style.left = Math.random() * 100 + '%';
		this.timeout = setTimeout(this.setNewDestination, 1000);
	}
}

export function init(backgroundIllustration, backgroundTransition) {
	backgroundIllustration.classList.remove('hide');

	backgroundIllustration.innerHTML = '<div class="eina-wrapper"><div class="n w"></div><div class="n e"></div><div class="s w"></div><div class="s e"></div><div class="eina-wrapper__static"></div></div>';

	staticWrapper = backgroundIllustration.querySelector('.eina-wrapper__static');

	for (let i = 0; i < 100; i++) {
		dotsArr.push(new Dot());
	}

}

export function destroy(backgroundIllustration) {
	clearTimeout(timeout);
	dotsArr.forEach(dot => {
		clearTimeout(dot.timeout);
	})
	backgroundIllustration.innerHTML = '';
}