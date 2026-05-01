FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy backend source
COPY . .

# IMPORTANT: Ensure data files exist inside container
COPY data ./data

# Show files for debugging (CI visibility)
RUN ls -R /app

EXPOSE 5000

CMD ["node", "index.js"]