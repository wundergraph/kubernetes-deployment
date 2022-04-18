FROM node:lts-slim as build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production
RUN npm run wunderctl -- version

ADD . .
RUN npm run wunderctl -- generate
RUN npm run wunderctl -- version
CMD npm run wunderctl -- start --debug

EXPOSE 9991