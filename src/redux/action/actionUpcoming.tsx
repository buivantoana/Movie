/* eslint-disable */
import { getAllMovie } from '../../service/homeservice'
import { Dispatch } from 'redux'

interface upCommingSuccessAction {
  type: 'UPCOMMING_SUCCESS'
  payload: any
}

interface upCommingFailAction {
  type: 'upComming_FAIL'
}

export type AuthActionTypes = upCommingSuccessAction | upCommingFailAction

export const upCommingSuccess = (data: any): upCommingSuccessAction => ({
  type: 'UPCOMMING_SUCCESS',
  payload: data,
})

export const upCommingFailure = (): upCommingFailAction => ({
  type: 'upComming_FAIL',
})

export const dataupComming = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      let res = await getAllMovie()
      if (res.status === 0) {
        const currentDate = new Date()
        let arr = res?.data.filter((item: any) => {
          const releaseDate = new Date(item.release_date)
          return currentDate < releaseDate
        })
        dispatch(upCommingSuccess(arr))
      }
    } catch (error) {
      dispatch(upCommingFailure())
    }
  }
}
