FROM node:10-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python
  
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

RUN npm install nodemon -g

COPY . .

CMD [ "npm", "start" ]
