// RAWG API key and base URL setup

const apiKey = '8501748fdf5149b7847749320e8162c1';
const baseUrl = 'https://api.rawg.io/api/games';

// Get current year to fetch games from that year

const year = new Date().getFullYear();

// Reference to the search input field in the DOM

const searchInput = document.getElementById('searchInput');

// Store currently displayed games globally so favorites can update without refreshing

let currentGames = [];

/**
 * Fetches the 50 most recent games released in the current year
 * Uses the RAWG API with filters on release date and ordering
 */

function fetchRecentGames() {
  fetch(`${baseUrl}?dates=${year}-01-01,${year}-12-31&ordering=-released&page_size=50&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      currentGames = data.results;
      displayGames(currentGames);
    })
    .catch(error => console.error('Error fetching games:', error));
}

// Search for games based on user query 

function searchGames(query) {
  fetch(`${baseUrl}?search=${encodeURIComponent(query)}&page_size=20&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      currentGames = data.results;
      displayGames(currentGames);
    })
    .catch(error => console.error('Error searching games:', error));
}

/**
 * Event listener for search input
 * Triggers search on Enter key press
 * If input is empty, it resets to showing the recent releases
 */

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      document.querySelector('h1').textContent = `Search Results for "${query}"`;
      searchGames(query);
    } else {
      document.querySelector('h1').textContent = `50 Most Recent Games Released in ${year}`;
      fetchRecentGames();
    }
  }
});

fetchRecentGames();

