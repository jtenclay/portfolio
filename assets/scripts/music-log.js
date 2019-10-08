if (window.location.href.indexOf('music-log') !== -1) {
  // const chartEl = document.querySelector('.time-of-day__chart');
  // const tooltipEl = document.querySelector('.time-of-day__tooltip');
  // const tooltipTextEl = document.querySelector('.time-of-day__tooltip-text');

  // chartEl.addEventListener('mousemove', (e) => {
  //   const mouseX = e.x;
  //   const chartX = chartEl.getBoundingClientRect().x;
  //   const percentLeft = (mouseX - chartX) / chartEl.scrollWidth;
  //   const timeKey = Math.round(1440 * percentLeft);

  //   if (typeof window.timeOfDayData[timeKey] !== 'undefined') {
  //     const numberOfEntries = window.timeOfDayData[timeKey];

  //     // Format percentage
  //     let percentage = numberOfEntries / window.totalEntries * 1000;
  //     percentage = Math.round(percentage) / 10;

  //     if (percentage % 1 === 0) {
  //       percentage = Math.round(percentage);
  //     }

  //     const percentFromBottom = percentage / window.maxY * 100;

  //     // Display tooltip
  //     tooltipEl.classList.add('time-of-day__tooltip--show');
  //     tooltipEl.style.height = `calc(${100 - percentFromBottom}% - 8px)`;
  //     tooltipTextEl.innerHTML = `${numberOfEntries} entries (${percentage}%)`;

  //     // Follow mouse
  //     tooltipEl.style.left = `${percentLeft * 100}%`;
  //     tooltipTextEl.style.bottom = `${percentFromBottom}%`;
  //   }
  // });
}
