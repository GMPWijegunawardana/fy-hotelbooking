# Build Stage
FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Inject backend URL for Docker
ENV VITE_API_URL=http://server:5000

RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# React Router fallback
RUN echo "server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]