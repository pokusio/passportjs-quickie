FROM node:stable-slim


WORKDIR /root

COPY .npm.scripts/*.sh ./
RUN apt-get update -y && chmod +x ./*.sh && ./.npm.scripts/init.sh


WORKDIR /usr/local/app

# COPY package*.json ./
# RUN npm install && npm cache clean --force

# COPY ./src ./src
