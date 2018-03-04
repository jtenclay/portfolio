let timeout,
		activeFlag = false,
		xArr = [];

class X {
	constructor(x, y) {
		this.DOM = document.createElement('div');
		this.top = y;
		this.DOM.style.top = y + '%';
		this.left = x;
		this.DOM.style.left = x + '%';
		this.opacity = 1;
	};
	moveUp() {
		this.top -= 2.5;
		this.DOM.style.top = this.top + '%';
		this.updateOpacity();
	}
	moveDown() {
		this.top += 2.5;
		this.DOM.style.top = this.top + '%';
		this.updateOpacity();
	}
	moveLeft() {
		this.left -= 2.5;
		this.DOM.style.left = this.left + '%';
		this.updateOpacity();
	}
	moveRight() {
		this.left += 2.5;
		this.DOM.style.left = this.left + '%';
		this.updateOpacity();
	}
	updateOpacity() {
		if (this.left < 15 || this.left > 80 || this.top < 15 || this.top > 80) {
			this.opacity = 0;
			this.DOM.style.opacity = 0;
		}
		else if (this.opacity == 0) {
			this.opacity = 1;
			this.DOM.style.opacity = 1;
		}
	}
}

function moveRowsForward() {
	xArr.forEach(x => {
		if (x.top % 10 == 0) x.moveRight();
		else x.moveLeft();
	})
	timeout = setTimeout(moveColsForward, 1000);
}

function moveRowsBack() {
	xArr.forEach(x => {
		if ((x.top + 2.5) % 10 == 0) x.moveLeft();
		else x.moveRight();
	})
	timeout = setTimeout(moveColsBack, 1000);
}

function moveColsForward() {
	xArr.forEach(x => {
		if ((x.left - 2.5) % 10 == 0) x.moveUp();
		else x.moveDown();
	})
	timeout = setTimeout(moveRowsBack, 1000);
}

function moveColsBack() {
	xArr.forEach(x => {
		if (x.left % 10 == 0) x.moveUp();
		else x.moveDown();
	})
	timeout = setTimeout(moveRowsForward, 1000);
}

export function init(backgroundIllustration, backgroundTransition) {
	activeFlag = true;
	backgroundIllustration.classList.remove('hide');

	const multipleWrapper = document.createElement('div');
	multipleWrapper.className = 'multiple-wrapper';

	for (let i = 15; i <= 80; i += 5) {
		for (let j = 15; j <= 80; j += 5) {
			xArr.push(new X(i, j));
		}
	}

	xArr.forEach(x => {
		multipleWrapper.appendChild(x.DOM);
	})

	backgroundIllustration.appendChild(multipleWrapper);
	timeout = setTimeout(moveRowsForward, 1000);

}

export function destroy(backgroundIllustration) {
	clearTimeout(timeout);
	xArr = [];
	activeFlag = false;
	backgroundIllustration.innerHTML = '';
}