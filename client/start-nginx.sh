#!/bin/sh

# Extract the DNS resolver from /etc/resolv.conf (needed for NGINX variables)
export RESOLVER=$(awk '/^nameserver/ {print $2; exit}' /etc/resolv.conf)

# Default backend URL for Docker Compose, configurable for K8s
export BACKEND_URL=${BACKEND_URL:-"http://hotel-backend:5000"}

# Substitute environment variables in the Nginx template
envsubst '${RESOLVER} ${BACKEND_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Starting Nginx with BACKEND_URL=$BACKEND_URL and RESOLVER=$RESOLVER"

# Start Nginx
exec nginx -g "daemon off;"
