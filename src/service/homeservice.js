import axios from "axios";
function getnew() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=e9e9d8da18ae29fc430845952232787c&language=vi-VN&page=1  `
  );
}
function populer() {
  return axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: {
      api_key: "e9e9d8da18ae29fc430845952232787c",
      with_genres: 28,
      language: "vi-VN",
    },
  });
}
function upcaming() {
  return axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: {
      api_key: "e9e9d8da18ae29fc430845952232787c",
      with_genres: 10749,
      language: "vi-VN",
    },
  });
}
function toprated() {
  return axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: {
      api_key: "e9e9d8da18ae29fc430845952232787c",
      with_genres: 16,
      language: "vi-VN",
    },
  });
}

function performer() {
  return axios.get("https://api.themoviedb.org/3/person/popular", {
    params: {
      api_key: "e9e9d8da18ae29fc430845952232787c",
      language: "vi-VN", // Ngôn ngữ yêu cầu
      page: 1, // Trang kết quả
    },
  });
}
function genre() {
  return axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=e9e9d8da18ae29fc430845952232787c&language=vi-VN`
  );
}

export { getnew, populer, upcaming, toprated, performer, genre };
