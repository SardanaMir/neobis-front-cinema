document.addEventListener("DOMContentLoaded", () => {
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
        // showMovies(respData)    
        typicalData(respData)
    }
    
    //при выборе категории
    const URL = [API_URL_PREMIERES, API_URL_CLOSE_RELEASES, API_URL_RELEASES, API_URL_TOP]
    const category = document.querySelectorAll('.category')
    for (let i = 0; i < category.length; i++){
        category[i].addEventListener('click', ()=>{
            for (let i = 0; i < category.length; i++){
                category[i].classList.remove('chose');
            }
            getMovies(URL[i]);
            category[i].classList.add('chose');
        })
    }
    
    //стартовая страница
    getMovies(API_URL_PREMIERES);
    category[0].classList.add('chose')
    
    //найти фильм
    function findMovie(){
        const search = document.querySelector('.header__search').value;
    }
    
    function typicalData(data){
        if (data.releases){
            data.items = data.releases
            delete data.releases
        }
        let selectedMovies = data.items.map(movie => {
            return {
                movieName: movie.nameRu,
                year: movie.year,
                movieUrl : movie.posterUrl,
                genre: movie.genres.map(item => item.genre).join(', '), 
            };
        });
        showMovies(selectedMovies)
        checkLiked(selectedMovies)   
    }

    function showMovies(data){
        moviesBlock = document.querySelector('.movies-container');
        moviesBlock.innerHTML = '';

        data.forEach(item =>{
            const movie = document.createElement('div');
            movie.classList.add('movie');
            movie.innerHTML = `
                <div class="movie__poster">
                    <img class="movie__poster-img" name="movieUrl" src="${item.movieUrl}" alt="">
                </div>
                <div class="movie__info">
                    <div class="movie__text">
                        <div class="movie__title" name="movieName">${item.movieName}</div>
                        <div class="movie__genre" name="genre">${item.genre}</div>
                        <div class="movie__year" name="year">${item.year}</div>
                    </div>
                    <div class="movie__panel">
                        <div class="movie__rating"><p class="rating" name=""rating>${checkRating(item.ratingKinopoisk)}</p></div>
                        <div class="movie__heart heart">
                        </div>
                    </div>

                </div>
            `;
            moviesBlock.appendChild(movie);            
        })
        like();
    }

    //проверка рейтинга
    function checkRating(rating){
        if (rating === null || !rating){
            return '-'
        }else{
            return Math.floor(rating*10)/10
        }
    }
    
    //поставить лайк
    const LS = localStorage;
    let movieData = {};
    let movieDataArray = [];

    function like(event){
        let hearts = document.querySelectorAll('.heart');
        const movieTitle = document.querySelectorAll('.movie__title');
        const movieUrl = document.querySelectorAll('.movie__poster-img')
        const genres = document.querySelectorAll('.movie__genre');
        const year = document.querySelectorAll('.movie__year');
        const rating = document.querySelectorAll('.rating');

        for (let i = 0; i < hearts.length; i++){
            hearts[i].addEventListener('click', ()=>{
                if (hearts[i].classList.contains('liked')){

                    hearts[i].classList.remove('liked');

                    movieDataArray = movieDataArray.filter(movie => movie.movieName !== movieTitle[i].textContent);

                    console.log(movieDataArray)
                    LS.setItem('movieData', JSON.stringify(movieDataArray))

                }else{
                    movieData = {};
                    hearts[i].classList.add('liked');
    
                    movieData[movieTitle[i].getAttribute('name')] = movieTitle[i].textContent;
                    movieData[movieUrl[i].getAttribute('name')] = movieUrl[i].src;
                    movieData[genres[i].getAttribute('name')] = genres[i].textContent;
                    movieData[year[i].getAttribute('name')] = year[i].textContent;
                    movieData[rating[i].getAttribute('name')] = rating[i].textContent;
                    movieData['liked'] = 'liked';

                    movieDataArray.push(movieData);
                    
                    LS.setItem('movieData', JSON.stringify(movieDataArray))
                }
            });
        }
    }
    function checkLiked(data){
        // console.log(data)
        if (LS.getItem('movieData')){
            movieDataArray = JSON.parse(LS.getItem('movieData'));
            // console.log(movieDataArray);
            let hearts = document.querySelectorAll('.heart')
            for (let i = 0; i < movieDataArray.length; i++){
                for (let j = 0; j < data.length; j++){
                    if (movieDataArray[i].movieName === data[j].movieName){
                        hearts[j].classList.add('liked')
                    }
                }
            }
        }
    }


    function favoriteMovies(event){
        event.preventDefault()
        movieDataArray = JSON.parse(LS.getItem('movieData'));
        showMovies(movieDataArray);
        checkLiked(movieDataArray)
    }

    document.querySelector('.favorite').addEventListener('click', favoriteMovies)
})


