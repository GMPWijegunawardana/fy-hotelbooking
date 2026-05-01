# build stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# production stage
FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy nginx template
RUN mkdir -p /etc/nginx/templates
COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=build /app/dist /usr/share/nginx/html

# Copy and setup start script
COPY start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh

EXPOSE 80

CMD ["/start-nginx.sh"]