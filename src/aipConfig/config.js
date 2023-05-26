// https://api.themoviedb.org/3/movie/now_playing?api_key=
// https://api.themoviedb.org/3/search/movie?api_key=&query=&page
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "e00bb48683aa6a7ef51d803c09e9bf9a";
const tmdbPath = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
    getMovieList: (type, page = 1) => `${tmdbPath}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetails: (movieId) => `${tmdbPath}/${movieId}?api_key=${apiKey}`,
    getMovieMeta: (movieId, type) => `${tmdbPath}/${movieId}/${type}?api_key=${apiKey}`,
    getMovieSearch: (query, page) => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`,
    imageOriginal: (path) => `https://image.tmdb.org/t/p/original/${path}`,
    image500: (path) => `https://image.tmdb.org/t/p/w500/${path}`,
};
