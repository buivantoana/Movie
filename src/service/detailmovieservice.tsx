import axios from '../component/axios/axios'
function getonemovie(id: any) {
  return axios.get(`/getonemovie/${id}`)
}

export { getonemovie }
