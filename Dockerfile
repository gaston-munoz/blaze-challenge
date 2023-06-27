FROM node:lts-hydrogen

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]