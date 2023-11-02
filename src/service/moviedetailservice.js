import axios from "axios";

function getonemovie(id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos&language=vi-VN
`
  );
}
function getonemovieus(id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos&language=en-US
`
  );
}
function getoneperformer(id) {
  return axios.get(
    `http://api.themoviedb.org/3/movie/${id}/casts?api_key=e9e9d8da18ae29fc430845952232787c
`
  );
}
function getmoviesimilar(id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=e9e9d8da18ae29fc430845952232787c&language=vi-VN&page=1

`
  );
}
function getmovieupcoming() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=e9e9d8da18ae29fc430845952232787c&language=vi-VN-US&page=1


`
  );
}

export {
  getonemovie,
  getoneperformer,
  getmoviesimilar,
  getmovieupcoming,
  getonemovieus,
};
