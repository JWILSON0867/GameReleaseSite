const apiKey = '8501748fdf5149b7847749320e8162c1';
const baseUrl = 'https://api.rawg.io/api/games';

// Get game ID from localStorage
const gameId = localStorage.getItem('selectedGameId');

// HTML elements
const gameTitle = document.getElementById('gameTitle');
const gameDetails = document.getElementById('gameDetails');

if (gameId) {
  fetch(`${baseUrl}/${gameId}?key=${apiKey}`)
    .then(res => res.json())
    .then(game => {
      
      gameTitle.textContent = game.name;

      // Build HTML
      gameDetails.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}" style="max-width: 100%; border-radius: 8px;">
        <p><strong>Released:</strong> ${game.released}</p>
        <p><strong>Rating:</strong> ${game.rating} / ${game.rating_top}</p>
        <p><strong>Genres:</strong> ${game.genres.map(g => g.name).join(', ')}</p>
        <p><strong>Platforms:</strong> ${game.platforms.map(p => p.platform.name).join(', ')}</p>
        <p><strong>Description:</strong></p>
        <div>${game.description}</div>
      `;
    })
    .catch(error => {
      gameTitle.textContent = 'Failed to load game.';
      console.error('Error loading game:', error);
    });
} else {
  gameTitle.textContent = 'No game selected.';
}
