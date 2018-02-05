#!/bin/bash

if [ "$1" = 'd' ] || [ "$1" = 'dev' ] || [ "$1" = 'development' ]; then
  ENV=development
elif [ "$1" = 'p' ] || [ "$1" = 'prod' ] || [ "$1" = 'production' ]; then
  echo -e '\e[1m Are you certain you want to deploy to production (y/N)? ';
  read answer
  if echo "$answer" | grep -iq "^y" ; then
      ENV=production
  else
      echo -e "\e[33m Deployment cancelled.";
      exit 0;
  fi
else 
  echo -e "\e[31m Please specify a valid deployment environment";
  exit 1;
fi

echo -e "\e[32m Starting '$ENV' deployment...";

. ~/.nvm/nvm.sh

#if production pull git master or release tag, add git install to provision server

npm install --no-optional

docker-compose stop
docker-compose build
docker-compose up -d
