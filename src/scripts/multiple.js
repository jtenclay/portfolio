let timeout,
		activeFlag = false;

class Line {
	constructor(x, y) {
		let rotation = 0;
		this.DOM = document.createElement('div');
		this.DOM.style.top = y + '%';
		this.DOM.style.left = x + '%';
		this.DOM.style.transform = 'rotate(' + rotation +'deg)';
	}
}

export function init(backgroundIllustration, backgroundTransition) {
	activeFlag = true;
	backgroundIllustration.classList.remove('hide');

	const multipleWrapper = document.createElement('div');
	multipleWrapper.className = 'multiple-wrapper';

	for (let i = 10; i <= 85; i += 5) {
		let lines = [];

		if (i == 85) {
			lines.push(
				new Line(i, i),
				new Line(i + 5, i - 5),
				new Line(i - 5, i + 5),
				new Line(95 - i, i),
				new Line(95 - i - 5, i - 5),
				new Line(95 - i + 5, i + 5)
			);
		} else {
			lines.push(
				new Line(i, i),
				new Line(i, i + 5),
				new Line(i + 5, i),
				new Line(i + 5, i - 5),
				new Line(i - 5, i + 5),
				new Line(95 - i, i),
				new Line(95 - i, i + 5),
				new Line(95 - i - 5, i),
				new Line(95 - i - 5, i - 5),
				new Line(95 - i + 5, i + 5)
			);
		}

		lines.forEach(line => {
			multipleWrapper.appendChild(line.DOM);
		})
	}

	backgroundIllustration.appendChild(multipleWrapper)

}

export function destroy(backgroundIllustration) {
	clearTimeout(timeout);
	activeFlag = false;
	backgroundIllustration.innerHTML = '';
}