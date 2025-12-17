ARG NODE_VERSION=24-alpine3.22
ARG DIR=/DriveHub
ARG PORT=4000


#################  stage 1 #################
#                                          #
#                 BASE                     #
#                                          #
# ##########################################
FROM node:${NODE_VERSION} AS  base
ARG DIR

WORKDIR ${DIR}

COPY package*.json .

RUN npm ci --omit=dev

COPY . .


#################  stage 2 #################
#                                          #
#                RELEASE                   #
#                                          #
# ##########################################

FROM alpine:3.22 AS release
ARG DIR
ARG PORT

WORKDIR ${DIR}


# Runtime deps
RUN apk add --no-cache \
    libstdc++ \
    dumb-init \
    ffmpeg \
    && addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node


COPY --from=base /usr/local/bin/node /usr/local/bin/node
COPY --from=base ${DIR}  ${DIR}


RUN mkdir -p \
    ${DIR}/unidad \
    ${DIR}/uploads \
    ${DIR}/converted \
    ${DIR}/QR \
    && chown -R node:node \
    ${DIR}/unidad \
    ${DIR}/uploads \
    ${DIR}/converted \
    ${DIR}/QR

USER node

ENV PORT=${PORT}
ENV NODE_ENV=production

ENTRYPOINT [ "dumb-init", "--" ]

CMD [ "node", "index.js" ]
