require 'active_support/time'
require 'json'

def add_top_time_to_totals()
  totals = JSON.parse(File.read('data/music-log-totals.json'))
  time_array = JSON.parse(File.read('data/music-log-time-of-day.json'))

  # Find which times had the max durataion
  max_time = time_array.max()
  indices = time_array.each_index.select { |i| time_array[i] == max_time }

  average_index = indices.sum / indices.size

  totals[:top_time] = Time.at(average_index * 60).utc.strftime('%l:%M%P')

  File.open('data/music-log-totals.json', 'w') { |f| f << totals.to_json }
end
