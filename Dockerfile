FROM node:16.15.1-alpine

WORKDIR /
COPY package.json .
RUN npm install
COPY . .
CMD [ "node", "index.js" ]
