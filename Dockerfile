FROM node:16.13.0-alpine3.14 as app-builder

WORKDIR /usr/app

RUN mkdir "config"

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./entrypoint.js ./entrypoint.js
COPY ./config-overrides.js ./config-overrides.js
COPY ./config/index_template.ejs ./config/index_template.ejs
COPY ./config/render-stats.js ./config/render-stats.js
COPY ./config/get-globals.js ./config/get-globals.js

RUN yarn

COPY ./tsconfig.json ./tsconfig.json
COPY ./public ./public
COPY ./src ./src

RUN yarn jest
RUN yarn build

# app
FROM node:16.13.0-alpine3.14 as app

WORKDIR /usr/app

RUN yarn global add http-server

COPY --from=app-builder /usr/app/build ./build
COPY --from=app-builder /usr/app/config ./config
COPY --from=app-builder /usr/app/package.json ./package.json
COPY --from=app-builder /usr/app/entrypoint.js ./entrypoint.js

RUN yarn

CMD REACT_APP_GRAPH_QL_ENDPOINT=$REACT_APP_GRAPH_QL_ENDPOINT REACT_APP_IMAGE_ENDPOINT=$REACT_APP_IMAGE_ENDPOINT REACT_APP_GRAPH_QL_WS_ENDPOINT=$REACT_APP_GRAPH_QL_WS_ENDPOINT node ./entrypoint.js && \
    http-server -p $PORT ./build