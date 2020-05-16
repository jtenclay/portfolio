require 'active_support/time'
require 'json'

def create_data_dump_calendar()
  entries = JSON.parse(File.read('data/music-log.json'))
    .map { |entry|
      entry['date'] = Date.strptime(entry['date'], '%Y-%m-%d')
      entry
    }

  # Chunk entries by year, month, week and day
  calendar = entries.group_by { |entry| entry['date'].strftime '%Y' }
    .transform_values { |year|
      year.group_by { |year_entry| year_entry['date'].strftime '%m' }
        .transform_values { |month|
          month.group_by { |month_entry| month_entry['date'].strftime '%U' }
            .transform_values { |week|
              week.group_by { |week_entry| week_entry['date'].strftime '%w' }
            }
        }
    }

  File.open('data/music-log-calendar.json', 'w') { |f| f << calendar.to_json }
end
