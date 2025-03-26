const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.text());

app.get('/youtube_cookies.txt', (req, res) => {
  const cookiePath = './youtube_cookies.txt';
  if (fs.existsSync(cookiePath)) {
    const content = fs.readFileSync(cookiePath, 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.send(content);
  } else {
    res.status(404).send('No cookies file found.');
  }
});

app.post('/youtube_cookies.txt', (req, res) => {
  const content = req.body;
  fs.writeFileSync('./youtube_cookies.txt', content);
  res.send('✅ Cookies updated successfully');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
