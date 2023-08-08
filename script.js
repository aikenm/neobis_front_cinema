const API_KEY = "eed3ab61-eb4b-433b-af21-8b9c09ac44c6";

const premiers = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=AUGUST";
const top_awaits = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const best = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";
const releases = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=OCTOBER&page=1";

function createFilmElement(film) {
    const filmElement = document.createElement('div');
    filmElement.classList.add('film');

    const imageElement = document.createElement('img');
    imageElement.src = film.posterUrlPreview;

    const nameElement = document.createElement('h3');
    nameElement.textContent = film.nameEn;

    const genreElement = document.createElement('p');
    genreElement.textContent = film.genres.join(', ');

    const ratingElement = document.createElement('p');
    ratingElement.textContent = film.ratingKinopoisk;

    filmElement.appendChild(imageElement);
    filmElement.appendChild(nameElement);
    filmElement.appendChild(genreElement);
    filmElement.appendChild(ratingElement);

    return filmElement;
}

// Premiers
fetch(premiers, {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const container = document.getElementById('premiers-container');
        if (data && data.films) {
            const top10Premiers = data.films.slice(0, 10);
            top10Premiers.forEach(film => {
                const filmElement = createFilmElement(film);
                container.appendChild(filmElement);
            });
        } else {
            console.log('Invalid or missing data in API response for premiers');
        }
    })
    .catch(err => console.log(err));


// Awaits
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
            if (container && container.children.length < 10) {
                const filmElement = createFilmElement(film);
                container.appendChild(filmElement);
            }
        });
    })
    .catch(err => console.log(err));


// Best
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
            if (container && container.children.length < 10) {
                const filmElement = createFilmElement(film);
                container.appendChild(filmElement);
            }
        });
    })
    .catch(err => console.log(err));


// Releases
fetch(releases, {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const container = document.getElementById('premiers-container');
        if (data && data.films) {
            const top10Premiers = data.films.slice(0, 10);
            top10Premiers.forEach(film => {
                const filmElement = createFilmElement(film);
                container.appendChild(filmElement);
            });
        } else {
            console.log('Invalid or missing data in API response for premiers');
        }
    })
    .catch(err => console.log(err));


