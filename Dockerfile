FROM node
WORKDIR /usr/src/api
COPY . .

#root
USER root 

RUN npm install
RUN npm install axios
RUN npm install typescript
RUN npm install -g ts-node
RUN npm install -g express
RUN npm install -g dotenv
RUN npm install -g tsx
RUN npx playwright install-deps
RUN npx playwright install
#--save-dev
RUN npm i --save-dev @types/express
RUN npm i --save-dev @types/mysql
RUN npm i --save-dev @types/dotenv
RUN export PATH=/usr/src/api/node_modules/