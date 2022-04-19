FROM node:lts as build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production
RUN npm run wunderctl -- version

ADD . .
RUN npm run wunderctl -- generate
CMD ["wunderctl", "--", "start", "--listen_addr", "0.0.0.0:9991", "--debug"]

EXPOSE 9991