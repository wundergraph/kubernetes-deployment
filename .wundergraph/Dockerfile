# Image layer for building the application
FROM node:lts as build

WORKDIR /usr/src/app

# rebuild image when package.json or lock has changed
COPY package*.json ./

# install dependencies
RUN npm ci --only=production

# install wunderctl in correct version
RUN curl -s -L https://github.com/wundergraph/wunderctl/releases/download/v0.74.7/wunderctl_0.74.7_Linux_x86_64.tar.gz | tar xzvf - && \
    chmod +x wunderctl && mv wunderctl /usr/local/bin
RUN wunderctl version

# add project artifacts to docker image
ADD . .
RUN wunderctl generate

# Image layer for production
from node:lts-alpine as runner
WORKDIR /usr/src/app

# run as non-root user
USER node

# copy entire project and dependencies
COPY --from=build --chown=node:node /usr/src/app .
# copy wunderctl to start the server
COPY --from=build --chown=node:node /usr/local/bin/wunderctl /usr/local/bin/wunderctl

CMD wunderctl start --listen_addr 0.0.0.0:9991 --debug

EXPOSE 9991