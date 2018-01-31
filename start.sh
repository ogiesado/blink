#!/bin/sh

npx pm2-docker start ./index.js \
`[ "$NODE_ENV" = 'development' ] && echo --watch`
