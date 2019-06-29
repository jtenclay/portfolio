require 'google_drive'
require 'json'
require 'dotenv/load'

def sync_music_log
  session = GoogleDrive::Session.from_service_account_key('data/service-account.json')
  rows = session.spreadsheet_by_key(ENV['GOOGLE_SPREADSHEET_ID']).worksheets[0].rows

  entries = Array.new

  rows[1..-1].each do |row|
    entries << {
      date: row[0],
      start_time: row[1],
      duration: row[2],
      instrument: row[3],
      description: row[4],
      tags: row[5]
    }
  end

  # Write entries to json
  File.open('data/music-log.json', 'w') { |f| f << entries.to_json }
end
