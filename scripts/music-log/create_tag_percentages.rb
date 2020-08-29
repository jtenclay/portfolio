require 'json'

def create_tag_percentages()
  totals = JSON.parse(File.read('data/music-log-totals.json'))

  entries_arr = totals['entries_by_tag'].to_a
  max_width = 400.0 # for 400px
  max_mobile_width = 200.0 # for 200px

  entries_arr.sort! { |a, b| a[1] <=> b[1] }
  max_duration = entries_arr.last()[1]
  entries_arr.each do |entry|
    entry[2] = (100.0 * entry[1] / totals['total_time']).round(1) # format percentage
    entry[3] = (max_mobile_width * entry[1] / max_duration).round() # scale down value for mobile display
    entry[1] = (max_width * entry[1] / max_duration).round() # scale down value for display

    # Prevent very small output
    entry[1] = 2 if entry[1] < 2
    entry[3] = 2 if entry[3] < 2
  end

  File.open('data/music-log-inline-tags.json', 'w') { |f| f << entries_arr.to_json }
end
