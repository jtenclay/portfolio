import entries from '../../data/music-log.json';

export default function initCalendar() {
  const filters = {
    hideImprov: document.querySelector('#hide-improv-entries').checked,
    instrument: document.querySelector('#calendar-instrument').value,
    tag: document.querySelector('#calendar-tag').value,
    text: document.querySelector('#calendar-text-filter').value,
  };

  const allDays = [...document.querySelectorAll('.data-dump-calendar__day')];

  function updateFilteredEntries() {
    const filteredEntries = entries.filter(entry => (
      (filters.instrument === 'all' || entry.instrument.includes(filters.instrument))
      && (filters.tag === 'all' || entry.tags.includes(filters.tag))
      && (!filters.hideImprov || entry.description !== 'Improv')
      && (!filters.text || entry.description.indexOf(filters.text) > -1)
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
    filters.text = e.currentTarget.value;
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
}
