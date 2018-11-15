#!/bin/sh

middleman build
rsync -avz \
--exclude *.DS_Store \
./build/ $DIGITALOCEAN_SERVER_CREDS:/var/www/jacksontenclay.com/html
