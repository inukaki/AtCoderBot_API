FROM node:17.4.0-alpine
WORKDIR /usr/src/api

#root
USER root 

RUN npm install axios
RUN apk add curl
RUN npm install typescript
RUN npm install -g ts-node
RUN npm install express
RUN npm i --save-dev @types/express
RUN npm i --save-dev @types/mysql
RUN export PATH=/usr/src/api/node_modules/

COPY . .