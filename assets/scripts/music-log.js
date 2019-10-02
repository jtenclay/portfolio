if (window.location.href.indexOf('music-log') !== -1) {
  const chartEl = document.querySelector('.time-of-day__chart svg');
  const tooltipEl = document.querySelector('.time-of-day__tooltip');

  chartEl.addEventListener('mousemove', (e) => {
    const mouseX = e.x;
    const chartX = chartEl.getBoundingClientRect().x;
    const percentLeft = (mouseX - chartX) / chartEl.scrollWidth;
    const timeKey = Math.round(1440 * percentLeft);

    if (window.timeOfDayData[timeKey]) {
      const numberOfEntries = window.timeOfDayData[timeKey];
      let percentage = numberOfEntries / window.totalEntries * 1000;

      percentage = Math.round(percentage) / 10;

      if (percentage % 1 === 0) {
        percentage = Math.round(percentage);
      }

      tooltipEl.innerHTML = `${numberOfEntries} entries (${percentage}%)`;
      tooltipEl.classList.add('time-of-day__tooltip--show');
    }
  });

  chartEl.addEventListener('mouseleave', () => {
    tooltipEl.classList.remove('time-of-day__tooltip--show');
  });
}
