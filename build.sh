#!/bin/bash

. ~/.nvm/nvm.sh #source nvm

npm install --no-optional

docker-compose stop
docker-compose build
docker-compose up -d