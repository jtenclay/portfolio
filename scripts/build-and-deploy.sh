#!/bin/sh

yarn build
rsync -avz ./dist/. $BLUEHOST_ADDRESS:~/public_html/