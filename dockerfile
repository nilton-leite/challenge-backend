# FROM node:20.6.1-bookworm-slim AS app

# WORKDIR /app/backend

# ARG UID=1000
# ARG GID=1000

# RUN apt-get update \
#   && apt-get install -y --no-install-recommends build-essential curl libpq-dev \
#   && rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man \
#   && apt-get clean \
#   && groupmod -g "${GID}" node && usermod -u "${UID}" -g "${GID}" node \
#   && mkdir -p /node_modules && chown node:node -R /node_modules /app

# USER node

# COPY --chown=node:node backend/package.json backend/*yarn* ./

# RUN yarn install && yarn cache clean

# ARG NODE_ENV="production"
# ENV NODE_ENV="${NODE_ENV}" \
#     PATH="${PATH}:/node_modules/.bin" \
#     USER="node"

# COPY --chown=node:node --from=assets /app/public /public
# COPY --chown=node:node backend/ ./
# COPY --chown=node:node bin/ /app/bin

# ENTRYPOINT ["/app/bin/docker-entrypoint-web"]

# EXPOSE 3003

# CMD ["yarn", "start"]



FROM node:lts-alpine

RUN npm install -g yarn

ADD package.json /src/package.json
ADD yarn.lock /src/yarn.lock

ADD node_modules .

RUN mkdir -p /home/node/server && chown -R node:node /home/node/server

RUN mkdir -p /opt/yarn/bin && ln -s /opt/yarn/yarn-v1.5.1/bin/yarn /opt/yarn/bin/yarn

WORKDIR /home/node/server

RUN mkdir -p node_modules && chown -R node:node node_modules

COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn install

COPY . .

EXPOSE ${PORT}

CMD ['yarn', 'start']

# # FROM node:18.16.0-alpine3.17
# # RUN mkdir -p /opt/app
# # WORKDIR /opt/app
# # COPY src/package.json src/package-lock.json 
# # RUN npm install
# # COPY src/ .
# # EXPOSE 3000
# # CMD [ "npm", "start"]

# # FROM node:9.7-alpine AS compile-image
# # RUN npm install -g yarn
# # WORKDIR /opt/ng 
# # COPY package.json yarn.lock angular.json ./
# # RUN yarn
# # RUN yarn install
# # COPY . ./ 
# # RUN node_modules/.bin/ng build --prod
# # FROM nginx:1.18-alpine
# # RUN apk add yarn
# # COPY --from=compile-image /opt/ng/dist/dashboard /usr/share/nginx/html
# # CMD ["yarn", "start"]