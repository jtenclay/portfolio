export default class HoverTile {
  constructor(a) {
    // Create DOM element
    this.dom = a;
    const filename = a.getAttribute('data-hover-tile');
    this.dom.innerHTML += (
      `<img
        class="hover-tile"
        src="/assets/img/hover-tiles/${filename}.gif"
        srcset="/assets/img/hover-tiles/${filename}.gif 1x, /assets/img/hover-tiles/${filename}@2x.gif 2x"
        alt="${a.innerHTML}"
      >`);
    this.tile = this.dom.querySelector('img');

    // Attach event handlers
    this.positionTile = (event) => {
      const e = event || window.event;
      let mouseX = 0;
      let mouseY = 0;
      if (e.pageX || e.pageY) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      } else if (e.clientX || e.clientY) {
        mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      this.tile.style.top = `${mouseY + 20}px`;
      this.tile.style.left = `${mouseX + 20}px`;
    };

    a.addEventListener('mouseover', this.positionTile);
    a.addEventListener('mousemove', this.positionTile);
  }
}
