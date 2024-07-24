FROM node:20-alpine AS development

WORKDIR /usr/app

COPY . .

RUN npm i

EXPOSE 5173