import axios from '../component/axios/axios'

const getMovieScroll = async (id: any, cursor: any) => {
  return axios.get(`/scrollmovie?cursor=${cursor}&id=${id}`)
}
function deleteMovie(id: any) {
  let token = localStorage.getItem('accessToken')
  return axios.delete(`/deletemovie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
function addMovie(data: any) {
  let token = localStorage.getItem('accessToken')
  return axios.post(`/addmovie`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
function putMovie(id: any, data: any) {
  let token = localStorage.getItem('accessToken')
  return axios.put(`/updatemovie/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
function getMovie() {
  return axios.get('/getmovie')
}
export { getMovieScroll, deleteMovie, addMovie, putMovie, getMovie }
