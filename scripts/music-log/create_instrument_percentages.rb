require 'json'

def create_instrument_percentages()
  totals = JSON.parse(File.read('data/music-log-totals.json'))

  entries_arr = totals['entries_by_instrument'].to_a
  max_width = 500.0 # for 500px

  entries_arr.sort! { |a, b| a[1] <=> b[1] }
  max_duration = entries_arr.last()[1]
  entries_arr.each do |entry|
    entry[1] = (max_width * entry[1] / max_duration).round()
  end

  File.open('data/music-log-inline-instruments.json', 'w') { |f| f << entries_arr.to_json }
end
