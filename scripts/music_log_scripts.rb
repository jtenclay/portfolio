require 'active_support/time'
require 'dotenv/load'
require 'google_drive'
require 'json'

def find_streaks(ordered_entries_by_date)
  prev = ordered_entries_by_date.first
  streaks = ordered_entries_by_date
    .slice_before { |e| prev, prev2 = e, prev; prev2[:date] + 1.day != e[:date] }
    .to_a

  longest_streak = streaks.max_by { |s| s.length }

  streaks_info = {
    longest_streak: longest_streak,
    streaks: streaks
  }

    File.open('data/music-log-streaks.json', 'w') { |f| f << streaks_info.to_json }
end

def find_time_of_day(entries)

  time_array = (0..1439).map { |time_index| 0 }

  entries.each do |entry|
    time_index = (Time.parse('2000/1/1 ' + entry[:start_time]).seconds_since_midnight / 60).to_i

    entry[:duration].times do
      # Reset to the beginning if we're after midnight
      time_index -= 1440 if time_index >= 1440

      time_array[time_index] += 1
      time_index += 1
    end
  end

  # Duplicate midnight at the end for continuity
  time_array << time_array.first

  File.open('data/music-log-time-of-day.json', 'w') { |f| f << time_array.to_json }
end

def find_totals(entries, ordered_entries_by_date)
  entries_by_tag = {}

  entries_by_tag = entries.reduce({}) do |acc, cur|
    cur[:tags].each do |tag|

      if (acc[tag])
        acc[tag] += cur[:duration]
      else
        acc[tag] = cur[:duration]
      end
    end

    acc
  end

  median_time_per_entry = median(entries.map { |entry| entry[:duration] })
  median_time_per_day = median(ordered_entries_by_date.map { |date| date[:duration] })

  totals = {
    entries_by_tag: entries_by_tag,
    median_time_per_day: median_time_per_day,
    median_time_per_entry: median_time_per_entry,
    total_time: entries.reduce(0) { |sum, num| sum + num[:duration] }
  }

  File.open('data/music-log-totals.json', 'w') { |f| f << totals.to_json }
end

def median(arr)
  sorted_arr = arr.sort
  if sorted_arr.length.odd?
    sorted_arr[(sorted_arr.length - 1) / 2]
  else
   ((sorted_arr[sorted_arr.length / 2] + sorted_arr[sorted_arr.length / 2 - 1]) / 2)
  end
end

def sync_music_log
  session = GoogleDrive::Session.from_service_account_key('data/service-account.json')
  rows = session.spreadsheet_by_key(ENV['GOOGLE_SPREADSHEET_ID']).worksheets[0].rows

  entries = Array.new

  rows[1..-1].each do |row|
    entries << {
      date: Date.strptime(row[0], '%m/%d/%y'),
      start_time: row[1],
      duration: row[2].to_i,
      instrument: row[3],
      description: row[4],
      tags: row[5].split(', ')
    }
  end

  File.open('data/music-log.json', 'w') { |f| f << entries.to_json }

  puts 'Sync complete.'

  reduce_music_log_by_date(entries)
  find_time_of_day(entries)

  puts 'JSON write complete.'
end

def reduce_music_log_by_date(entries)
  entries_by_date = entries.reduce({}) do |acc, cur|
    date = cur[:date]
    if (acc[date])
      acc[date] += cur[:duration]
    else
      acc[date] = cur[:duration]
    end

    acc
  end

  ordered_entries_by_date = entries_by_date
    .sort_by { |key, val| key }
    .map { |item| { date: item[0], duration: item[1] } }

  File.open('data/music-log-by-date.json', 'w') { |f| f << ordered_entries_by_date.to_json }

  find_totals(entries, ordered_entries_by_date)
  find_streaks(ordered_entries_by_date)
end

sync_music_log
