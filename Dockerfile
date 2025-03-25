FROM node:18-slim

# Cài Chromium và các dependencies cần thiết
RUN apt-get update && apt-get install -y \
    chromium \
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
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    wget \
    curl \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set Puppeteer sử dụng Chromium cài trong hệ thống
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Tạo thư mục app
WORKDIR /app

# Copy và cài đặt code
COPY package*.json ./
RUN npm install
COPY . .

# Expose port và start server
EXPOSE 3000
CMD ["node", "index.js"]
