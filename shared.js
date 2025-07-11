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

function getTimeSinceRelease(releasedDate, currentDate) {
  if (isNaN(releasedDate)) return 'Release date unknown';

  const diffTime = Math.abs(currentDate - releasedDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Released today';
  if (diffDays === 1) return 'Released 1 day ago';
  if (diffDays < 30) return `Released ${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return 'Released 1 month ago';
  if (diffMonths < 12) return `Released ${diffMonths} months ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `Released ${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
}

function displayGames(games, viewingFavorites = false) {
  gamesContainer.innerHTML = '';
  const favorites = getFavorites();

  games.forEach(game => {
    const isFavorite = favorites.some(fav => fav.id === game.id);
    const div = document.createElement('div');
    div.classList.add('game');

    /* div.innerHTML = `
      <h3>
        ${game.name}
        <span class="star" style="color: ${isFavorite ? 'gold' : 'gray'};">★</span>
      </h3>
      <img src="${game.background_image}" alt="${game.name}">
    `;
    */

    const releaseDate = new Date(game.released);
    const today = new Date();
    const timeSinceRelease = getTimeSinceRelease(releaseDate, today);

    div.innerHTML = `
      <h3>
        ${game.name}
        <span class="star" style="color: ${isFavorite ? 'gold' : 'gray'};">★</span>
      </h3>
      <p class="release-time">${timeSinceRelease}</p>
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
