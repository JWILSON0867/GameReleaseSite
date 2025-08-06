// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (e.g., index.html, JS, CSS) from /public
app.use(express.static(path.join(__dirname, 'public')));

// API route for games
app.get('/api/games', async (req, res) => {
  const apiKey = process.env.RAWG_API_KEY;

  // Start building base URL
  let url = `https://api.rawg.io/api/games?key=${apiKey}`;

  // Append all query parameters from the frontend
  for (const [key, value] of Object.entries(req.query)) {
    url += `&${key}=${encodeURIComponent(value)}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('RAWG API Error:', error);
    res.status(500).json({ error: 'Failed to fetch from RAWG API' });
  }
});

// Fallback route to serve index.html (for SPA or root path)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

