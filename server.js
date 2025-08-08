const express = require('express'); //Framework to build webserver
const cors = require('cors'); //Middleware to allow cross-origin requests (e.g., frontend calling backend)
const path = require('path'); //Helps resolve file paths correctly across systems
require('dotenv').config(); //Loads .env file so program can use process.env.RAWG_API_KEY

const app = express(); //Creates the Express app instance
const PORT = process.env.PORT || 3000; //Sets the port to what's in .env (e.g., PORT=8080) or falls back to 3000

// Middleware
app.use(cors()); //cors(): Allows the frontend to make requests to this backend from a different origin (like localhost:5500 to localhost:3000)
app.use(express.json()); //express.json(): Lets Express parse incoming JSON in requests

// Serve static files (e.g., index.html, JS, CSS) from /public making them accessible http://localhost:3000.
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
//If someone visits the root (/), it sends back your main index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

