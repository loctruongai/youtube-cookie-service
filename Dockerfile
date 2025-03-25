FROM node:18

# Cài thêm Chrome & các thư viện cần thiết
RUN apt-get update && apt-get install -y \
    wget gnupg unzip ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libnspr4 libnss3 libxss1 lsb-release xdg-utils libgbm-dev libu2f-udev libvulkan1 \
    && rm -rf /var/lib/apt/lists/*

# Cài Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb || apt-get install -fy && \
    rm google-chrome-stable_current_amd64.deb

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
