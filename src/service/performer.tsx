import axios from 'axios'
function performer() {
  return axios.get('https://api.themoviedb.org/3/person/popular', {
    params: {
      api_key: 'e9e9d8da18ae29fc430845952232787c',
      language: 'vi-VN', // Ngôn ngữ yêu cầu
      page: 1, // Trang kết quả
    },
  })
}
export { performer }
