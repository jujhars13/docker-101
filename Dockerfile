FROM node:16-buster-slim

ADD ./examples/js/database /app

WORKDIR /app

RUN npm install

CMD [ "node", "database.js" ]