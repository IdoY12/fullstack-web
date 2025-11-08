FROM node:22-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "docker"]

# docker run --name weezer-frontend -d -p 3011:5173 idoyahav/weezer-frontend:1.0.1