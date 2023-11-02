import axios from "axios";

function gender(id, page) {
  return axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: {
      api_key: "e9e9d8da18ae29fc430845952232787c",
      with_genres: id,
      language: "vi-VN",
      page: page,
    },
  });
}
export { gender };
