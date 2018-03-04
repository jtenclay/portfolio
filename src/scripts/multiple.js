let timeout,
		activeFlag = false,
		lines = [];

class Line {
	constructor(x, y, rotation) {
		this.DOM = document.createElement('div');
		this.DOM.style.top = y + '%';
		this.DOM.style.left = x + '%';
		this.rotation = rotation;
		this.DOM.style.transform = 'rotate(' + rotation +'deg)';
	};
	wiggle() {
		this.DOM.style.transform = 'rotate(' + randomWiggle(this.rotation) +'deg)';
	}
}

function randomWiggle(rotation) {
	let diff = Math.random() * 8 - 4;
	return rotation + diff;
}

export function init(backgroundIllustration, backgroundTransition) {
	activeFlag = true;
	backgroundIllustration.classList.remove('hide');

	const multipleWrapper = document.createElement('div');
	multipleWrapper.className = 'multiple-wrapper';

	/**
	 * pattern:
	 *
	 *     A B    F G
	 *   C D        H I
	 *   E            J
	 */



	for (let i = 15; i <= 85; i += 5) {
		let theseLines = [];

		if (i == 85) {
			theseLines.push(
				new Line(i, i - 5, 45), // A
				new Line(i - 5, i, 45), // C
				new Line(95 - i + 5, i, -45), // I
				new Line(95 - i, i - 5, -45) // G
			);
		} else {
			theseLines.push(
				new Line(i, i, 45), // D
				new Line(i, i - 5, 45), // A
				new Line(i - 5, i, 45), // C
				new Line(i + 5, i - 5, 45), // B
				new Line(i - 5, i + 5, 45), // E
				new Line(95 - i, i, -45), // H
				new Line(95 - i, i - 5, -45), // G
				new Line(95 - i - 5, i - 5, -45), // F
				new Line(95 - i + 5, i, -45), // I
				new Line(95 - i + 5, i + 5, -45) // J
			);
		}

		theseLines.forEach(line => {
			multipleWrapper.appendChild(line.DOM);
		})
		lines = lines.concat(theseLines);
	}

	backgroundIllustration.appendChild(multipleWrapper);
	function wiggleLines() {
		console.log(lines)
		lines.forEach(line => {
			line.wiggle();
		})
		timeout = setTimeout(wiggleLines, 60);
	}
	wiggleLines();

}

export function destroy(backgroundIllustration) {
	clearTimeout(timeout);
	lines = [];
	activeFlag = false;
	backgroundIllustration.innerHTML = '';
}