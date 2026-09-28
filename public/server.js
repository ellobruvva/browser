const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files from the "public" folder
app.use(express.static('public'));

app.get('/fetch', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' 
      },
      responseType: 'text'
    });

    // Strip frame-blocking security headers
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');

    res.send(response.data);
  } catch (error) {
    res.status(500).send('Unable to load requested URL');
  }
});

app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
