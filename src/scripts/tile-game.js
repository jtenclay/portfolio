let timeout;

export function init(backgroundIllustration) {
	backgroundIllustration.innerHTML = '<div id="tile-game"><div id="cell-1" class="row-1 column-1"><span>1</span></div><div id="cell-2" class="row-1 column-2"><span>2</span></div><div id="cell-3" class="row-1 column-3"><span>3</span></div><div id="cell-4" class="row-1 column-4"><span>4</span></div><div id="cell-5" class="row-2 column-1"><span>5</span></div><div id="cell-6" class="row-2 column-2"><span>6</span></div><div id="cell-7" class="row-2 column-3"><span>7</span></div><div id="cell-8" class="row-2 column-4"><span>8</span></div><div id="cell-9" class="row-3 column-1"><span>9</span></div><div id="cell-10" class="row-3 column-2"><span>10</span></div><div id="cell-11" class="row-3 column-3"><span>11</span></div><div id="cell-12" class="row-3 column-4"><span>12</span></div><div id="cell-13" class="row-4 column-1"><span>13</span></div><div id="cell-14" class="row-4 column-2"><span>14</span></div><div id="cell-15" class="row-4 column-3"><span>15</span></div></div>';



	// create tile objects

	var tiles = [];

	var Tile = function(id, x, y, img, dom, origRow, origCol) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.img = img;
		this.dom = dom;
		this.origRow = origRow; // for background image
		this.origCol = origCol; // for background image
	};

	for (var i = 0; i < 15; i++) {
		let domTile = document.getElementById("cell-" + (i + 1)),
				x = parseInt(domTile.className.split(" ")[1].replace("column-","")), // grab column number from element
				y = parseInt(domTile.className.split(" ")[0].replace("row-","")), // grab row number from element
				origRow = y, // store original values for background image
				origCol = x,
				newTile = new Tile(i + 1, x, y, "", domTile, origRow, origCol); // make new tile object
		tiles.push(newTile);
	};


	// create empty tile

	var emptyTile = {
		id: "empty",
		x: 4,
		y: 4
	};

	tiles.push(emptyTile);



	// functions for moving tiles

	var moveLeft = function() {
		var didMove = false;
		var currentRow = tiles[15].y;
		var currentCol = tiles[15].x;
		// find the element to move if it exists
		for (var i = 0; i < tiles.length - 1; i++) {
			if (tiles[i].y === currentRow && tiles[i].x === currentCol + 1) {
				didMove = true;
				var tileToMove = tiles[i];
				var domToMove = document.getElementById("cell-" + tileToMove.id);
				tileToMove.x--; // change position of new tile
				domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
				tiles[15].x++
			};
		};
		if (!didMove) randomMovement();
		
	};

	var moveRight = function() {
		var didMove = false;
		var currentRow = tiles[15].y;
		var currentCol = tiles[15].x;
		// find the element to move if it exists
		for (var i = 0; i < tiles.length - 1; i++) {
			if (tiles[i].y === currentRow && tiles[i].x === currentCol - 1) {
				didMove = true;
				var tileToMove = tiles[i];
				var domToMove = document.getElementById("cell-" + tileToMove.id);
				tileToMove.x++; // change position of new tile
				domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
				tiles[15].x--
			};
		};
		if (!didMove) randomMovement();
		
	};

	var moveUp = function() {
		var didMove = false;
		var currentRow = tiles[15].y;
		var currentCol = tiles[15].x;
		// find the element to move if it exists
		for (var i = 0; i < tiles.length - 1; i++) {
			if (tiles[i].y === currentRow + 1 && tiles[i].x === currentCol) {
				didMove = true;
				var tileToMove = tiles[i];
				var domToMove = document.getElementById("cell-" + tileToMove.id);
				tileToMove.y--; // change position of new tile
				domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
				tiles[15].y++
			};
		};
		if (!didMove) randomMovement();
		
	};

	var moveDown = function() {
		var didMove = false;
		var currentRow = tiles[15].y;
		var currentCol = tiles[15].x;
		// find the element to move if it exists
		for (var i = 0; i < tiles.length - 1; i++) {
			if (tiles[i].y === currentRow - 1 && tiles[i].x === currentCol) {
				didMove = true;
				var tileToMove = tiles[i];
				var domToMove = document.getElementById("cell-" + tileToMove.id);
				tileToMove.y++; // change position of new tile
				domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
				tiles[15].y--
			};
		};
		if (!didMove) randomMovement();
		
	};



	// shuffle board

	var randomMovement = function() {
		var rand = Math.floor(Math.random() * 4);
		if (rand === 0) {
			moveLeft();
		} else if (rand === 1) {
			moveUp();
		} else if (rand === 2) {
			moveRight();
		} else {
			moveDown();
		};
	};

	var shuffleBoard = function() {
		for (var i = 0; i < 1000; i++) {
			randomMovement();
		};
	};

	shuffleBoard();

	function autoMove() {
		clearTimeout(timeout); // just in case
		randomMovement();
		timeout = setTimeout(() => {
			autoMove();
		}, 1000);
	}
	autoMove();

}

export function destroy(backgroundIllustration) {
	clearTimeout(timeout);
	backgroundIllustration.innerHTML = '';
}