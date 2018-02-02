#!/bin/sh

npx pm2-docker start ./pm2-$(echo $NODE_ENV).yml
