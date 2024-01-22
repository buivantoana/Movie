import axios from '../component/axios/axios'

const addCustumer = (payload: any) => {
  return axios.post(`/addcustumer`, payload)
}
const LoginCustumer = (payload: any) => {
  return axios.post(`/login`, payload)
}
const Authorization = (newToken: string | null = null) => {
  let token = localStorage.getItem('accessToken')
  if (token) {
    return axios.get('/authorization', {
      headers: {
        Authorization: `Bearer ${newToken || token}`,
      },
    })
  }
}
const refeshToken = () => {
  let token = localStorage.getItem('refeshToken')
  if (token) {
    return axios.get('/refeshtoken', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
const Logout = () => {
  return axios.get(`/logout`)
}

const getCustumer = () => {
  return axios.get(`/getcustumer`)
}

const addAlbum = (payload: any) => {
  return axios.post(`/addalbum`, payload)
}
const getAlbum = (payload: any) => {
  return axios.get(`/getalbum/${payload}`)
}

const deleteCustumer = (id: any) => {
  let token = localStorage.getItem('accessToken')
  return axios.delete(`/deletecustumer/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const getAlbumScroll = async (id: any, cursor: any) => {
  return axios.get(`/scrollalbum?cursor=${cursor}&id=${id}`)
}

const addHistoy = (payload: any) => {
  return axios.post(`/addhistory`, payload)
}
const getHistoy = (payload: any) => {
  return axios.get(`/gethistory/${payload}`, payload)
}
const getHistoyMovie = (payload: any) => {
  return axios.get(`/gethistorymovie/${payload}`)
}
const deleteHistoyMovie = (payload: any) => {
  return axios.delete(
    `/deletehistorymovie/${payload.id}/${payload.movie_id}`,
    payload,
  )
}
export {
  addCustumer,
  LoginCustumer,
  Authorization,
  Logout,
  getCustumer,
  deleteCustumer,
  addAlbum,
  getAlbum,
  getAlbumScroll,
  addHistoy,
  getHistoy,
  getHistoyMovie,
  deleteHistoyMovie,
  refeshToken,
}
