import axios from '../component/axios/axios'
function addGender(data: any) {
  let token = localStorage.getItem('accessToken')
  return axios.post(`/addgender`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

function deleteGender(id: any) {
  let token = localStorage.getItem('accessToken')
  return axios.delete(`/deletegender/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
function putGender(id: any, data: any) {
  let token = localStorage.getItem('accessToken')
  return axios.put(`updategender/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
function getGender() {
  return axios.get('/getgender')
}

export { addGender, deleteGender, getGender, putGender }
