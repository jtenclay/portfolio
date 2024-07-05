#!/bin/sh

rm -rf ./build
rm -rf ./.tmp
node scripts/charts/everyday-chart.js
bundle exec middleman build
rsync -avz ./build/ /var/www/jacksontenclay.com/html
