FROM node:20.9.0

WORKDIR /DriveHub

COPY . .

RUN  npm install

EXPOSE 4000

CMD npm start


