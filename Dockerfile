FROM node:16-bullseye-slim

WORKDIR /service

RUN chown -R node:node /service

COPY --chown=node:node package*.json .

RUN npm i --no-save && npm cache clean -f

COPY --chown=node:node . /service

EXPOSE 6006

USER node

CMD ["npm", "start"]
