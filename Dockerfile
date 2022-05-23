FROM node:16-bullseye-slim

USER node

WORKDIR /service

COPY package*.json .

RUN npm i --no-save && npm cache clean -f

COPY . /service

EXPOSE 6006

CMD ["npm", "start"]
