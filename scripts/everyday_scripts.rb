require 'active_support/time'
require 'dotenv/load'
require 'google_drive'
require 'json'

def sync_everyday_log
  session = GoogleDrive::Session.from_service_account_key('data/service-account.json')
  rows = session.spreadsheet_by_key(ENV['GOOGLE_EVERYDAY_SPREADSHEET_ID']).worksheets[1].rows

  entries = Array.new

  rows[1..-1].each_with_index do |row, i|
    unless row[0].empty?
      entries << {
        date: Date.strptime(row[0], '%m/%d/%y'),
        description: row[1],
        bike_miles: row[2].to_f,
        wandrer_miles: row[3].to_f,
        id: i.to_s
      }
    end
  end

  File.open('data/everyday-log.json', 'w') { |f| f << entries.to_json }

  puts 'Sync complete.'
end

sync_everyday_log
