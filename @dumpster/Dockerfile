FROM node

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN npm install -g npm@7.21.1
#RUN npm install

COPY . .
COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]