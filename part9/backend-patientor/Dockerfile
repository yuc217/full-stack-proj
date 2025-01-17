FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV DEBUG=app:*

RUN npm run tsc
EXPOSE 3000

CMD npm start