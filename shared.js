const gamesContainer = document.getElementById('games');

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(game) {
  let favorites = getFavorites();
  const exists = favorites.find(fav => fav.id === game.id);
  if (exists) {
    favorites = favorites.filter(fav => fav.id !== game.id);
  } else {
    favorites.push(game);
  }
  saveFavorites(favorites);
}

function displayGames(games, viewingFavorites = false) {
  gamesContainer.innerHTML = '';
  const favorites = getFavorites();

  games.forEach(game => {
    const isFavorite = favorites.some(fav => fav.id === game.id);
    const div = document.createElement('div');
    div.classList.add('game');
    div.innerHTML = `
      <h3>
        ${game.name}
        <span class="star" style="color: ${isFavorite ? 'gold' : 'gray'};">★</span>
      </h3>
      <img src="${game.background_image}" alt="${game.name}">
    `;

    div.querySelector('.star').addEventListener('click', () => {
      toggleFavorite(game);
      if (viewingFavorites) {
        displayGames(getFavorites(), true); // Refresh on unstar
      } else {
        displayGames(currentGames); // From main page
      }
    });

    gamesContainer.appendChild(div);
  });
}
