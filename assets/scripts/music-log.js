if (window.location.href.indexOf('music-log') !== -1) {
  const visualizations = document.querySelectorAll('.d3-vis__wrapper');

  visualizations.forEach((vis) => {
    const guideCheckboxToggle = vis.querySelector('.d3-vis__guide-checkbox');
    const smoothGraphToggle = vis.querySelector('.d3-vis__smooth-graph');

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

    if (smoothGraphToggle) {
      smoothGraphToggle.addEventListener('click', (e) => {
        if (e.currentTarget.checked) {
          // Show smoothed area
          vis.classList.add('d3-vis--smooth-graph');
        } else {
          // Show precise area
          vis.classList.remove('d3-vis--smooth-graph');
        }
      });
    }
  });
}
