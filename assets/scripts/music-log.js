if (window.location.href.indexOf('music-log') !== -1) {
  const timeOfDayEl = document.querySelector('.time-of-day');

  document.querySelector('.time-of-day__guide-checkbox').addEventListener('click', function() {
    if (this.checked) {
      // Show guides
      timeOfDayEl.classList.remove('time-of-day--hide-guides');
    } else {
      // Hide guides
      timeOfDayEl.classList.add('time-of-day--hide-guides');
    }
  });
}
