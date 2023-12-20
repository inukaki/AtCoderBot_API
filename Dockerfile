FROM node:17.4.0-alpine
WORKDIR /usr/src/api

RUN npm install express
RUN npm install axios
RUN apk add curl

COPY . .