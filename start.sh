#!/bin/sh

npx pm2-docker --no-auto-exit start ./pm2-$(echo $NODE_ENV).yml
