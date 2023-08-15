// First key
//const API_KEY = "eed3ab61-eb4b-433b-af21-8b9c09ac44c6";

// Second key
const API_KEY = "e4e07a0d-eac1-4a46-a069-2cb4e5e35cfd";

// Third key
//const API_KEY = "9a7a3e88-7a75-44d3-9684-53e20ec95909";

const premiers = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=AUGUST";
const top_awaits = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const best = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";
const releases = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=AUGUST&page=1";

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesCounter = document.getElementById('favorites-counter').textContent = favorites.length;
const filmIdMap = {};

const favoritesButton = document.getElementById('favorites-button');
const homeButton = document.getElementById('home-button');
const mainSection = document.getElementById('main-section');
const favoritesSection = document.getElementById('favorites-section');
const favoritesContainer = document.getElementById('favorites-container');

favoritesButton.addEventListener('click', function () {
    mainSection.style.display = 'none';
    favoritesSection.style.display = 'block';

    favoritesButton.classList.add('active');
    homeButton.classList.remove('active');

    displayFavoriteFilms();
});

homeButton.addEventListener('click', function () {
    favoritesSection.style.display = 'none';
    mainSection.style.display = 'block';

    homeButton.classList.add('active');
    favoritesButton.classList.remove('active');

    location.reload();
});

function displayFavoriteFilms() {
    favoritesContainer.innerHTML = '';

    const titleElement = document.createElement('h3');
    titleElement.classList.add('container-title');
    titleElement.textContent = 'Your favorites';
    favoritesContainer.appendChild(titleElement);

    if (favorites.length === 0) {
        const noFavoritesMessage = document.createElement('span');
        noFavoritesMessage.classList.add('no-favorites-message');
        noFavoritesMessage.textContent = "You don't have any favorite movies yet :(";
        favoritesContainer.appendChild(noFavoritesMessage);
    } else {
        favorites.forEach(favorite => {
            const film = filmIdMap[favorite];

            if (film) {
                const filmElement = createFilmElement(film);
                favoritesContainer.appendChild(filmElement);
            }
        });
    }
}

function heartButtonEvent(heartButton, heartIcon, film) {
    const identifier = film.kinopoiskId || film.filmId;

    heartButton.addEventListener('click', function () {
        const index = favorites.indexOf(identifier);

        if (index === -1) {
            favorites.push(identifier);
            heartIcon.classList.add('heart-filled');
        } else {
            favorites.splice(index, 1);
            heartIcon.classList.remove('heart-filled');
        }

        document.getElementById('favorites-counter').textContent = favorites.length;

        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavoriteFilms();
    });

    if (favorites.includes(identifier)) {
        heartIcon.classList.add('heart-filled');
    }
}


function createFilmElement(film) {
    const filmElement = document.createElement('div');
    filmElement.classList.add('film');

    const imageElement = document.createElement('img');
    imageElement.src = film.posterUrlPreview;
    imageElement.classList.add('poster');

    const nameElement = document.createElement('h3');
    nameElement.textContent = film.nameRu;
    nameElement.classList.add('film-title');

    const genreNames = film.genres.map(genreObject => genreObject.genre);
    const genreElement = document.createElement('p');
    genreElement.textContent = genreNames.join(', ');
    genreElement.classList.add('genre-title');

    const ratingElement = document.createElement('p');
    const formattedRating = formatRating(film.rating);
    ratingElement.textContent = formattedRating;
    ratingElement.classList.add('film-rating');

    if (parseFloat(formattedRating) > 9.0) {
        ratingElement.classList.add('green-border');
    } else if (parseFloat(formattedRating) > 8.0) {
        ratingElement.classList.add('light-green-border');
    } else if (parseFloat(formattedRating) > 7.0) {
        ratingElement.classList.add('yellow-border');
    } else if (parseFloat(formattedRating) > 6.0) {
        ratingElement.classList.add('orange-border');
    } else if (parseFloat(formattedRating) > 4.0) {
        ratingElement.classList.add('orange-border');
    } else {
        ratingElement.classList.add('red-border');
    }

    const heartButton = document.createElement('button');
    heartButton.classList.add('heart-button');
    const heartIcon = document.createElement('img');
    heartIcon.src = 'images/heart1.png';
    heartIcon.classList.add('heart-icon');
    heartButton.appendChild(heartIcon);

    filmElement.appendChild(imageElement);
    filmElement.appendChild(nameElement);
    filmElement.appendChild(genreElement);
    filmElement.appendChild(ratingElement);
    filmElement.appendChild(heartButton);
    heartButtonEvent(heartButton, heartIcon, film);

    return filmElement;
}

function formatRating(rating) {
    if (typeof rating === 'number') {
        return rating.toFixed(1);
    } else if (typeof rating === 'string') {
        if (rating.endsWith('%')) {
            const numericRating = parseFloat(rating);
            if (!isNaN(numericRating)) {
                return (numericRating / 10).toFixed(1);
            }
        } else {
            const numericRating = parseFloat(rating);
            if (!isNaN(numericRating)) {
                return numericRating.toFixed(1);
            }
        }
    }
    return '0';
}

window.addEventListener('DOMContentLoaded', function () {
    // Top Premiers fetch
    fetch(premiers, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('premiers-container');
            data.items.forEach(film => {
                if (container && container.children.length < 11) {
                    const filmElement = createFilmElement(film);
                    container.appendChild(filmElement);
                }
                filmIdMap[film.kinopoiskId] = film;
            });
        })
        .catch(err => console.log(err));


    // Top Awaits fetch
    fetch(top_awaits, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('top_awaits-container');
            data.films.forEach(film => {
                if (container && container.children.length < 11) {
                    const filmElement = createFilmElement(film);
                    container.appendChild(filmElement);
                }
                filmIdMap[film.filmId] = film;
            });
        })
        .catch(err => console.log(err));


    // Top Best fetch
    fetch(best, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('best-container');
            data.films.forEach(film => {
                if (container && container.children.length < 11) {
                    const filmElement = createFilmElement(film);
                    container.appendChild(filmElement);
                }
                filmIdMap[film.filmId] = film;
            });
        })
        .catch(err => console.log(err));


    // Top Releases fetch
    fetch(releases, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('releases-container');
            data.releases.forEach(film => {
                if (container && container.children.length < 11) {
                    const filmElement = createFilmElement(film);
                    container.appendChild(filmElement);
                }
                filmIdMap[film.filmId] = film;
            });
        })
        .catch(err => console.log(err));
});