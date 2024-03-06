# Build
FROM node:20.11.0-alpine as build
WORKDIR /app

COPY . ./
RUN npm ci --silent
RUN npm run build

# Web Server
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]