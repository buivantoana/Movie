import axios from '../component/axios/axios'

function getAllMovie() {
  return axios.get('/getmovie')
}
function actionmovie(id: any) {
  return axios.get(`/getmoviegender/${id}`)
}

export { getAllMovie, actionmovie }
