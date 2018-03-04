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
		this.updateOpacity();
		this.updateHighlight();
		this.DOM.innerHTML = '<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><line x1="1.85" y1="1.85" x2="8.15" y2="8.15" fill="none" stroke="#9fe2ba" stroke-linecap="round" stroke-miterlimit="10"/><line x1="8.15" y1="1.85" x2="1.85" y2="8.15" fill="none" stroke="#9fe2ba" stroke-linecap="round" stroke-miterlimit="10"/></svg>'
	};
	moveUp() {
		this.top -= 5;
		this.DOM.style.top = this.top + '%';
		this.updateOpacity();
		this.updateHighlight();
	}
	moveDown() {
		this.top += 5;
		this.DOM.style.top = this.top + '%';
		this.updateOpacity();
		this.updateHighlight();
	}
	moveLeft() {
		this.left -= 5;
		this.DOM.style.left = this.left + '%';
		this.updateOpacity();
		this.updateHighlight();
	}
	moveRight() {
		this.left += 5;
		this.DOM.style.left = this.left + '%';
		this.updateOpacity();
		this.updateHighlight();
	}
	updateOpacity() {
		if (this.left < 5 || this.left > 85 || this.top < 5 || this.top > 85 ||
				((this.left == 5 || this.left == 85) && (this.top == 5 || this.top == 85))) {
			this.opacity = 0;
			this.DOM.style.opacity = 0;
		}
		else if (this.opacity == 0) {
			this.opacity = 1;
			this.DOM.style.opacity = 1;
		}
	}
	updateHighlight() {
		if (this.testForHighlight()) this.DOM.classList.add('highlighted');
		else this.DOM.classList.remove('highlighted');
	}
	testForHighlight() {
		if (!((this.left == 15 || this.left == 75) && (this.top == 15 || this.top == 75)) &&
				(Math.abs(this.left - this.top) <= 10 ||
				Math.abs(90 - this.left - this.top) <= 10) &&
				this.left > 10 && this.left < 80 &&
				this.top > 10 && this.top < 80) return true;
		else return false;
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
		if (x.top % 10 == 0) x.moveRight();
		else x.moveLeft();
	})
	timeout = setTimeout(moveColsBack, 1000);
}

function moveColsForward() {
	xArr.forEach(x => {
		if (x.left % 10 == 0) x.moveUp();
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

	for (let i = 0; i <= 90; i += 5) {
		for (let j = 0; j <= 90; j += 5) {
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