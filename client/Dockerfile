# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config if needed, default is fine for simple SPA usually, 
# but for React Router we need to handle fallback.
# Creating a simple default.conf inline or relying on hash router.
# For simplicity, we'll stick to default nginx, but if refresh fails on subpages, user might need config.
# To ensure it works well, let's add a basic config trick:
RUN echo "server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
