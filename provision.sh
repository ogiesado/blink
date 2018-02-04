#!/bin/bash
#SCRIPT TO PROVSION THE DOCKER HOST SERVER

apt-get update && apt-get upgrade -y

#INSTALL GIT
apt-get install -y git
#set git user

#INSTALL DOCKER

#remove older versions of docker and the contents of /var/lib/docker/, 
#including images, containers, volumes, and networks, are preserved. 
apt-get remove docker docker-engine docker.io

#install packages to allow apt to use a repository over HTTPS:
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

#add docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

#set up the stable repository
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

#update apt and install docker
apt-get update
apt-get install -y docker-ce=17.12.0~ce-0~ubuntu

#INSTALL DOCKER COMPOSE
curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

#INSTALL NVM

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
. ~/.nvm/nvm.sh

#INSTALL NODE
nvm install v9.4.0
nvm use 9.4.0
