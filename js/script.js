// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': APIKEY,
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))



// //премьеры месяца

// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=OCTOBER', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': APIKEY,
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))


// //цифровые релизы

// fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=OCTOBER&page=1', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': APIKEY,
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))

// //top фильмов
// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': APIKEY,
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))

// // ожидамые релизы

// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': APIKEY,
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))


let heart = document.querySelector('.heart');
function like(){
    heart.src = 'img/heart-red.svg';
}
heart.ondblclick  = like;