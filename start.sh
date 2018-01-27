#!/bin/sh
./node_modules/.bin/pm2-docker start ./index.js \
`[ "$NODE_ENV" = 'development' ] && echo --watch`