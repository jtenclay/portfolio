require 'json'

def create_rolling_average()
  time_array = JSON.parse(File.read('data/music-log-time-of-day.json'))
  time_array.pop # calculate averages without the duplicated midnight

  time_difference = 10
  rolling_averages = []

  time_array.each_with_index do |day, i|
    acc = day

    time_difference.times do |d|
      diff = d + 1
      acc += time_array[i - diff]
      acc += (time_array[i + diff] or time_array[i + diff - time_array.length])
    end

    rolling_averages << (acc / (time_difference * 2.0 + 1)).round(2)
  end

  # Duplicate midnight at the end for continuity
  rolling_averages << rolling_averages.first

  File.open('data/music-log-time-of-day-rolling-average.json', 'w') { |f| f << rolling_averages.to_json }
end
