FROM node:stable-slim

WORKDIR /usr/local

COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app

COPY src ./src
