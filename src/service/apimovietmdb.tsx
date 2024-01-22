import axios from 'axios'
function getoneperformer(id: number) {
  return axios.get(
    `http://api.themoviedb.org/3/movie/${id}/casts?api_key=e9e9d8da18ae29fc430845952232787c`,
  )
}
function getmovieupcoming() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=e9e9d8da18ae29fc430845952232787c&language=vi-VN-US&page=1`,
  )
}
function topsearch() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=e9e9d8da18ae29fc430845952232787c&page=1&language=vi-VN`,
  )
}

export { getoneperformer, getmovieupcoming, topsearch }
