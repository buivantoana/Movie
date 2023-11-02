import axios from "axios";

function search(search) {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=e9e9d8da18ae29fc430845952232787c&query=${search}&language=vi-VN`
  );
}
function topsearch() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=e9e9d8da18ae29fc430845952232787c&page=1&language=vi-VN`
  );
}
export { search, topsearch };
