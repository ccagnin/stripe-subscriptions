FROM node:lastest

WORKDIR /usr/mercado-pago-assinatura

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]
