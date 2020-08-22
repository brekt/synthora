FROM node:14.4.0-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

RUN npm i webpack-cli
RUN npx webpack --mode=production

EXPOSE 9000

COPY . .

CMD [ "node", "./server/index.js" ]
