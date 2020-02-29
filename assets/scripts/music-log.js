if (window.location.href.indexOf('music-log') !== -1) {
  const visualizations = document.querySelectorAll('.d3-vis__wrapper');

  visualizations.forEach((vis) => {
    const guideCheckboxToggle = vis.querySelector('.d3-vis__guide-checkbox');
    const cropGraphToggle = vis.querySelector('.d3-vis__crop-graph');

    if (guideCheckboxToggle) {
      guideCheckboxToggle.addEventListener('click', (e) => {
        if (e.currentTarget.checked) {
          // Show guides
          vis.classList.remove('d3-vis--hide-guides');
        } else {
          // Hide guides
          vis.classList.add('d3-vis--hide-guides');
        }
      });
    }

    if (cropGraphToggle) {
      cropGraphToggle.addEventListener('click', (e) => {
        if (e.currentTarget.checked) {
          // Show cropped area
          vis.classList.add('d3-vis--cropped-graph');
        } else {
          // Show full area
          vis.classList.remove('d3-vis--cropped-graph');
        }
      });
    }
  });
}
