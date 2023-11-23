FROM node:20.9.0-alpine

WORKDIR /DriveHub

COPY package.json .
COPY package-lock.json .

RUN  npm install

COPY . /DriveHub 

EXPOSE 4000

CMD npm start


