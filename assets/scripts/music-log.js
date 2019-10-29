if (window.location.href.indexOf('music-log') !== -1) {
  const timeOfDayEl = document.querySelector('.time-of-day');

  document.querySelector('.time-of-day__guide-checkbox').addEventListener('click', (e) => {
    if (e.currentTarget.checked) {
      // Show guides
      timeOfDayEl.classList.remove('time-of-day--hide-guides');
    } else {
      // Hide guides
      timeOfDayEl.classList.add('time-of-day--hide-guides');
    }
  });

  document.querySelector('.time-of-day__smooth-graph').addEventListener('click', (e) => {
    if (e.currentTarget.checked) {
      // Show smoothed area
      timeOfDayEl.classList.add('time-of-day--smooth-graph');
    } else {
      // Show precise area
      timeOfDayEl.classList.remove('time-of-day--smooth-graph');
    }
  });
}
