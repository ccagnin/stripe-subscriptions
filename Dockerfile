FROM node:18.10.0

WORKDIR /usr/src/app


COPY . .

RUN npm install
EXPOSE 4000

CMD npm run prod
