FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Create data directory
RUN mkdir -p /app/data

EXPOSE 3002

CMD ["node", "dist/index.js"]
