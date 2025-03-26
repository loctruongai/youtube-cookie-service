const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.text({ type: '*/*' }));

// Route hiện tại (ví dụ /youtube_cookies.txt)
app.get('/youtube_cookies.txt', (req, res) => {
  res.sendFile(__dirname + '/youtube_cookies.txt');
});

// ✅ Route mới để nhận POST và cập nhật file
app.post('/update', (req, res) => {
  fs.writeFile(__dirname + '/youtube_cookies.txt', req.body, (err) => {
    if (err) {
      console.error('❌ Failed to write cookies:', err);
      return res.status(500).send('Failed to update cookies');
    }
    console.log('✅ Cookies updated successfully');
    res.send('Cookies updated successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
