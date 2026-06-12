FROM harbor.azsoftware.az/public/node:18-alpine as build

RUN mkdir /app

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json .

COPY package-lock.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build



FROM harbor.azsoftware.az/public/nginx:1.21-alpine

EXPOSE 80

RUN rm -f /usr/share/nginx/html/*

RUN echo "server { listen 80; listen [::]:80; server_name localhost; root /usr/share/nginx/html; location / { try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
