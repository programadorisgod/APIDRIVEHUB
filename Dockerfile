FROM node:18

WORKDIR /DriveHub

COPY . .

RUN  npm install

EXPOSE 4000

CMD npm start


