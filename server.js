const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Statik dosyalar (index.html, videos klasörü)
app.use(express.static(__dirname));

// Video listesini JSON olarak sun
app.get('/videolist', (req, res) => {
  const videoDir = path.join(__dirname, 'videos');
  fs.readdir(videoDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Video klasörü okunamadı.' });
    }

    const mp4Files = files
      .filter(file => file.endsWith('.mp4'))
      .map(file => ({
        name: path.basename(file, '.mp4'),
        file: file
      }));

    res.json(mp4Files);
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
