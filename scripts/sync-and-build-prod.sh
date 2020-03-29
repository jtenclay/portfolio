#!/bin/sh

ruby scripts/music_log_scripts.rb
node scripts/create-d3-charts.js
middleman build
rsync -avz ./build/ /var/www/jacksontenclay.com/html
