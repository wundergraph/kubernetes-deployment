# Image layer for building the application
FROM node:lts as build

# global npm dependencies: recommended to place those dependencies in the non-root user directory
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /usr/src/app

# rebuild image when package.json or lock has changed
COPY package*.json ./

# install dependencies
RUN npm ci --only=production

# add project artifacts to docker image
ADD . .

# listen on all IPv4 interfaces
ENV WG_NODE_URL=http://127.0.0.1:9991 WG_NODE_INTERNAL_URL=http://127.0.0.1:9993 WG_NODE_HOST=0.0.0.0 WG_NODE_PORT=9991 WG_NODE_INTERNAL_PORT=9993 WG_SERVER_URL=http://127.0.0.1:9992 WG_SERVER_HOST=127.0.0.1 WG_SERVER_PORT=9992

# generate your wundergraph application
RUN npm exec wunderctl generate

# Image layer for production
FROM node:lts-alpine as runner
WORKDIR /usr/src/app

# copy entire project and dependencies
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/.wundergraph ./.wundergraph
# copy wunderctl
COPY --from=build --chown=node:node /usr/src/app/node_modules/@wundergraph/wunderctl/download/wunderctl /usr/local/bin/wunderctl

RUN wunderctl version

# run as non-root user
USER node

WORKDIR .wundergraph

CMD wunderctl start

EXPOSE 9991
