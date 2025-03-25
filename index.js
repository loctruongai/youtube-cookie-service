const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/youtube_cookies.txt", (req, res) => {
  const filePath = path.join(__dirname, "youtube_cookies.txt");
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send("Cookies file not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
