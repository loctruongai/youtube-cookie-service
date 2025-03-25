const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.youtube.com', { waitUntil: 'networkidle2' });

  // Đợi 10 giây để bạn login thủ công nếu cần
  console.log("⏳ Vui lòng đăng nhập YouTube trong 10 giây nếu cần...");
  await page.waitForTimeout(10000);

  const cookies = await page.cookies();

  const cookieText = cookies.map(cookie => [
    cookie.domain,
    "TRUE",
    cookie.path,
    cookie.secure ? "TRUE" : "FALSE",
    Math.floor(Date.now() / 1000) + 3600,
    cookie.name,
    cookie.value
  ].join("\t")).join("\n");

  fs.writeFileSync("/app/youtube_cookies.txt", "# Netscape HTTP Cookie File\n" + cookieText);
  console.log("✅ Cookie đã được lưu tại /app/youtube_cookies.txt");

  await browser.close();
})();
