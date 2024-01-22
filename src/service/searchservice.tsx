import axios from '../component/axios/axios'

const getSearchScroll = async (name: any, cursor: any) => {
  return axios.get(`/scrollsearchmovie?cursor=${cursor}&search=${name}`)
}
export { getSearchScroll }
