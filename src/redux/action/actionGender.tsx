/* eslint-disable */
import { getGender } from '../../service/genderservice'
import { Dispatch } from 'redux'

interface genderSuccessAction {
  type: 'GENDER_SUCCESS'
  payload: any
}

interface genderFailAction {
  type: 'GENDER_FAIL'
}

export type AuthActionTypes = genderSuccessAction | genderFailAction

export const genderSuccess = (data: any): genderSuccessAction => ({
  type: 'GENDER_SUCCESS',
  payload: data,
})

export const genderFailure = (): genderFailAction => ({
  type: 'GENDER_FAIL',
})

export const dataGender = () => {
  return async (dispatch: Dispatch<any>) => {
	  try {
		  let res = await getGender()
		  if (res.status === 0) {
			  dispatch(genderSuccess(res.data))
		  }
      
    } catch (error) {
      dispatch(genderFailure())
    }
  }
}


