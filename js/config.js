function currentMonth(date){
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    let monthIndex = date.getMonth();
    return months[monthIndex];
}
let MONTH = currentMonth(new Date());

let YEAR = new Date().getFullYear();

const APIKEY = 'f3885b3f-8eb1-42da-8eb4-706447b87019';
//премьеры месяца
const API_URL_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${YEAR}&month=${MONTH}`;
//цифровые релизы
const API_URL_RELEASES = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${YEAR}&month=${MONTH}&page=1`;
//top фильмов
const API_URL_TOP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1';
// ожидамые релизы
const API_URL_CLOSE_RELEASES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1';


