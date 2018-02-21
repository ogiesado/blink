#!/bin/bash
echo "Hope is not a strategy; a solid plan is.";

NPM_ENV=""

if [ "$1" = 'd' ] || [ "$1" = 'dev' ] || [ "$1" = 'development' ]; then
  ENV=development
elif [ "$1" = 'p' ] || [ "$1" = 'prod' ] || [ "$1" = 'production' ]; then
  echo -e '\e[1m Are you certain you want to deploy to production (y/N)? ';
  read answer
  if echo "$answer" | grep -iq "^y" ; then
      ENV=production
      NPM_ENV="--production"
  else
      echo -e "\e[33m Deployment cancelled.";
      exit 0;
  fi
else 
  echo -e "\e[31m Please specify a valid deployment environment";
  exit 1;
fi

echo -e "\e[32m Deploying $ENV...";

. ~/.nvm/nvm.sh

#if production pull git master or release tag
if [ "$ENV" = "production" ]; then
  git stash
  git checkout master
  git pull origin
fi

npm install "$NPM_ENV"

docker-compose stop
docker-compose build
docker-compose up -d

if [ "$ENV" = "development" ]; then
  npx webpack --watch
else
  npx webpack -p
fi
