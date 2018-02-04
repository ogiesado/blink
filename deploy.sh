#!/bin/bash

. ~/.nvm/nvm.sh #source nvm

#if production pull git master or release tag, add git install to provision server

npm install --no-optional

docker-compose stop
docker-compose build
docker-compose up -d
