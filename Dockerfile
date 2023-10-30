FROM node:20.5.1-bullseye-slim
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i -g npm
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "index.js" ]
