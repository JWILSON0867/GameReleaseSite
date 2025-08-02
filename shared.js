// Reference to main container where games will be displayed

const gamesContainer = document.getElementById('games');

/**
 * Retrieve favorite games from localStorage.
 * Returns an array of favorite game objects, empty array if none are saved.
 */

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Save the current list of favorite games to localStorage.

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Removes or adds to favorite list

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

// Calculate how much time has passed since the game's release.

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

// Display Games takes an array of javascript objects

function displayGames(games, viewingFavorites = false) {

  // Clears div container
  
  gamesContainer.innerHTML = '';
  const favorites = getFavorites();

  // Loop through array of Game objects

  games.forEach(game => {
    const isFavorite = favorites.some(fav => fav.id === game.id); // Boolean value, .some() "does at least 1 in the array meet the condition", fav is current instance checks if id field is the same
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

    //Get Time passed sinced Game release

    const releaseDate = new Date(game.released);
    const today = new Date();
    const timeSinceRelease = getTimeSinceRelease(releaseDate, today);

    // Create div element
    //ternary operator, {isFavorite ? 'gold' : 'gray'}, if found to be in favorites turn star gold

    div.innerHTML = `
      <h3>
        ${game.name}
        <span class="star" style="color: ${isFavorite ? 'gold' : 'gray'};">★</span> 
      </h3>
      <p class="release-time">${timeSinceRelease}</p>
      <img src="${game.background_image}" alt="${game.name}">
`;

// When star is clicked if on favorites page will remove entry automatically as page refreshes

    div.querySelector('.star').addEventListener('click', () => {
      toggleFavorite(game);
      if (viewingFavorites) {
        displayGames(getFavorites(), true); 
      } else {
        displayGames(currentGames); 
      }
    });

    const img = div.querySelector('img');
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      localStorage.setItem('selectedGameId', game.id);
      window.location.href = 'game-details.html';
    });

    gamesContainer.appendChild(div);
  });

}
