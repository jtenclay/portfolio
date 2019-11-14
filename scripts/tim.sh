#!/bin/sh

DATE=$(date +"%Y\/%m\/%d")

vim data/today-i-made.yaml +"%s/\v()(\n^...$)/\r- ${DATE}: \r\2/g" +"normal Gkk$" +"startinsert!"
