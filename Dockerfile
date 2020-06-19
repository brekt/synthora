FROM node:14.4.0-alpine3.12

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

EXPOSE 9000

COPY . .

CMD [ "npm", "start" ]
