const apiKey = '8501748fdf5149b7847749320e8162c1';
const baseUrl = 'https://api.rawg.io/api/games';
const year = new Date().getFullYear();
const searchInput = document.getElementById('searchInput');

let currentGames = [];

function fetchRecentGames() {
  fetch(`${baseUrl}?dates=${year}-01-01,${year}-12-31&ordering=-released&page_size=50&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      currentGames = data.results;
      displayGames(currentGames);
    })
    .catch(error => console.error('Error fetching games:', error));
}

function searchGames(query) {
  fetch(`${baseUrl}?search=${encodeURIComponent(query)}&page_size=20&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      currentGames = data.results;
      displayGames(currentGames);
    })
    .catch(error => console.error('Error searching games:', error));
}

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

