FROM node:17.4.0-alpine
WORKDIR /usr/src/api
COPY . .

#root
USER root 

RUN npm install
RUN npm install axios
RUN apk add curl
RUN npm install typescript
RUN npm install -g ts-node
RUN npm install -g express
RUN npm install -g dotenv
#--save-dev
RUN npm i --save-dev @types/express
RUN npm i --save-dev @types/mysql
RUN npm i --save-dev @types/dotenv
RUN export PATH=/usr/src/api/node_modules/