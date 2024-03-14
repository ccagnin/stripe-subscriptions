FROM node:21.10.0-alpine3.14

WORKDIR /usr/src/app


COPY . .

RUN npm install
EXPOSE 4000

CMD npm run prod
