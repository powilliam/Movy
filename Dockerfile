FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE ${PORT}

CMD ["yarn", "start:dev"]