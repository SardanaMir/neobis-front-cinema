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
        showMovies(respData)
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
    
    function showMovies(data){
        moviesBlock = document.querySelector('.movies-container');
        moviesBlock.innerHTML = '';
        if (data.releases){
            data.items = data.releases
            delete data.releases
            console.log(data)
        }
        console.log(data.items.rating)
        data.items.forEach(item =>{
            const movie = document.createElement('div');
            movie.classList.add('movie');
            movie.innerHTML = `
                <div class="movie__poster">

                    <img class="movie__poster-img" src="${item.posterUrl}" alt="">
                </div>
                <div class="movie__info">
                    <div class="movie__text">
                        <div class="movie__title">${item.nameRu}</div>
                        <div class="movie__genre">${item.genres.map(item=>item.genre)}</div>
                        <div class="movie__year">${item.year}</div>
                    </div>
                    <div class="movie__panel">
                        <div class="movie__rating"><p class="rating">${checkRating(item.ratingKinopoisk)}</p></div>
                        <div class="movie__heart heart">
                        </div>
                    </div>

                </div>
            `;
            moviesBlock.appendChild(movie)
        })
    
        like();
    }
    
    //проверка рейтинга
    function checkRating(rating){
        if (rating === null || !rating){
            return '-'
            return document.querySelector('.movie__rating').remove()
        }else{
            return Math.floor(rating*10)/10
        }
    }
    //поставить лайк
    
    function like(){
        let hearts = document.querySelectorAll('.heart');
        console.log(hearts)
        for (let i = 0; i < hearts.length; i++){
            hearts[i].addEventListener('click', ()=>{
                hearts[i].classList.toggle('liked')
            });
        }
    }
    
})


