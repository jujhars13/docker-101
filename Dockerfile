FROM node:16

ADD ./examples/index.js /app/index.js

CMD [ "node", "/app/index.js" ]