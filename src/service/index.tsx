import axios from '../component/axios/axios'
const getGender = () => {
  return axios.get(`/getgender`)
}

export { getGender }
