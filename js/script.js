//премьеры месяца
const API_URL_PREMIERES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=OCTOBER';
//цифровые релизы
const API_URL_RELEASES = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=OCTOBER&page=1';
//top фильмов
const API_URL_TOP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1';
// ожидамые релизы
const API_URL_CLOSE_RELEASES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1';

async function getMovies(url){
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': APIKEY,
            'Content-Type': 'application/json',
        },
    })
    const respData = await resp.json()
    console.log(respData);
    showMovies(respData)
}

const premieres = document.getElementById('premieres');
premieres.addEventListener('click', ()=>{
    getMovies(API_URL_PREMIERES);
})

const topClose = document.getElementById('top-close');
topClose.addEventListener('click', ()=>{
    getMovies(API_URL_CLOSE_RELEASES);
})
const release = document.getElementById('release');
release.addEventListener('click', ()=>{
    getMovies(API_URL_RELEASES);
})
const bestFilms  = document.getElementById('best-films');
bestFilms.addEventListener('click', ()=>{
    getMovies(API_URL_TOP);
})
// getMovies(API_URL_PREMIERES);
// getMovies(API_URL_RELEASES);
// getMovies(API_URL_TOP);
// getMovies(API_URL_CLOSE_RELEASES);

function showMovies(data){
    moviesBlock = document.querySelector('.movies-container');

    data.items.forEach(item =>{
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.innerHTML = `
            <div class="movie__poster">
                <div class="movie__heart">
                    <img class="heart" src="img/heart.svg" alt="">
                </div>
                <img class="movie__poster-img" src="${item.posterUrl}" alt="">
            </div>
            <div class="movie__info">
                <div class="movie__text">
                    <div class="movie__title">${item.nameRu}</div>
                    <div class="movie__genre">${item.genres.map(item=>item.genre)}</div>
                    <div class="movie__year">${item.year}</div>
                </div>
                <div class="movie__rating"><p class="rating">${Math.floor(item.rating*10)/10}</p></div>
            </div>
        `;
        moviesBlock.appendChild(movie)
    })
}

//поставить лайк
let hearts = document.querySelectorAll('.heart');
for (let i = 0; i < hearts.length; i++){
    hearts[i].ondblclick  = like(hearts[i]);
}
function like(heart){
   heart.src = 'img/heart-red.svg';
}
