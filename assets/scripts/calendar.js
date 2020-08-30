import entries from '../../data/music-log.json';

export default function initCalendar() {
  const filters = {
    hideImprov: document.querySelector('#hide-improv-entries').checked,
    instrument: document.querySelector('#calendar-instrument').value,
    tag: document.querySelector('#calendar-tag').value,
    text: document.querySelector('#calendar-text-filter').value.toLowerCase(),
  };

  const allDays = [...document.querySelectorAll('.data-dump-calendar__day')];

  function updateFilteredEntries() {
    const filteredEntries = entries.filter(entry => (
      (filters.instrument === 'all' || entry.instrument.includes(filters.instrument))
      && (filters.tag === 'all' || entry.tags.includes(filters.tag))
      && (!filters.hideImprov || entry.description !== 'Improv')
      && (!filters.text || entry.description.toLowerCase().indexOf(filters.text) > -1)
    ));

    allDays.forEach(day => day.classList.remove('active'));
    filteredEntries.forEach(({ $el }) => $el.classList.add('active'));
  }

  // Associate data with DOM elements
  [...document.querySelectorAll('.data-dump-calendar__day')].forEach((dayEl) => {
    const ids = dayEl.getAttribute('data-day-ids');
    if (!ids) return;

    ids.split(',').forEach((id) => {
      const entry = entries.find(e => e.id === id);

      if (entry) entry.$el = dayEl;
    });
  });

  document.querySelector('#calendar-text-filter').addEventListener('input', (e) => {
    filters.text = e.currentTarget.value.toLowerCase();
    updateFilteredEntries();
  });

  document.querySelector('#hide-improv-entries').addEventListener('click', (e) => {
    filters.hideImprov = e.currentTarget.checked;
    updateFilteredEntries();
  });

  document.querySelector('#calendar-instrument').addEventListener('change', (e) => {
    filters.instrument = e.currentTarget.value;
    updateFilteredEntries();
  });

  document.querySelector('#calendar-tag').addEventListener('change', (e) => {
    filters.tag = e.currentTarget.value;
    updateFilteredEntries();
  });

  updateFilteredEntries();

  const avoidClippedPane = (el) => {
    const $pane = el.parentNode.querySelector('.data-dump-calendar__details-pane');
    $pane.style.transform = 'translateX(-50%)';

    const paneDimensions = $pane.getBoundingClientRect();
    const leftClip = paneDimensions.left;
    const rightClip = document.documentElement.clientWidth - (paneDimensions.left + paneDimensions.width);

    if (leftClip < 15) {
      // Prevent clipping off the left side of the screen
      $pane.style.transform = `translateX(calc(-50% + ${15 - leftClip}px))`;
    } else if (rightClip < 15) {
      // Prevent clipping off the left side of the screen
      $pane.style.transform = `translateX(calc(-50% - ${15 - rightClip}px))`;
    }
  };

  // Handle the details pane overflowing the viewport
  [...document.querySelectorAll('.data-dump-calendar__day:not(.data-dump-calendar__day--placeholder)')].forEach((el) => {
    el.addEventListener('mouseenter', () => avoidClippedPane(el));
    el.addEventListener('focus', () => avoidClippedPane(el));
  });
}
