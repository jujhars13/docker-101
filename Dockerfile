FROM node:16-alpine

ADD ./examples/js/database /app

WORKDIR /app

RUN npm install

CMD [ "node", "database.js" ]
