# Build
FROM node:20.11.0-alpine as build
WORKDIR /app

COPY . ./
RUN npm ci --silent
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]