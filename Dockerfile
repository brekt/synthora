FROM node:14.4.0-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

EXPOSE 9000

COPY . .

CMD [ "node", "./server/index.js" ]
