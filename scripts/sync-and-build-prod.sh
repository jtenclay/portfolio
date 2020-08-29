#!/bin/sh

bundle exec ruby scripts/music_log_scripts.rb
node scripts/create-d3-charts.js
bundle exec middleman build
rm -rf ./build
rm -rf ./.tmp
rsync -avz ./build/ /var/www/jacksontenclay.com/html
