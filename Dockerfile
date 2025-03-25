FROM node:18-slim

# Cài Chromium và dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    wget \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Tạo thư mục code
WORKDIR /app

# Copy file cần thiết
COPY package*.json ./
RUN npm install
COPY . .

# Mặc định chạy file main.js
CMD ["node", "main.js"]
