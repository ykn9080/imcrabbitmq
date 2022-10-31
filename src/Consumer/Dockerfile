FROM node:14

WORKDIR /Consumer

COPY package.json .

COPY . .

RUN npm install

RUN npm install sharp@0.27.0

CMD ["npm", "start"]