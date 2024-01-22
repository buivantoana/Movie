/* eslint-disable */
import { Dispatch } from 'redux'

import {
  Authorization,
  LoginCustumer,
  Logout,
  refeshToken,
} from '../../service/custumer'

interface LoginSuccessAction {
  type: 'LOGIN_SUCCESS'
}

interface LogoutSuccessAction {
  type: 'LOGOUT_SUCCESS'
}

interface LoginFailureAction {
  type: 'LOGIN_FAILURE'
}

interface AuthenticateSuccessAction {
  type: 'AUTHENTICATE_SUCCESS'
  payload: any // User data, adjust the type accordingly
}

interface AuthenticateFailureAction {
  type: 'AUTHENTICATE_FAILURE'
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | AuthenticateSuccessAction
  | AuthenticateFailureAction
  | LogoutSuccessAction

export const loginSuccess = (): LoginSuccessAction => ({
  type: 'LOGIN_SUCCESS',
})

export const loginFailure = (): LoginFailureAction => ({
  type: 'LOGIN_FAILURE',
})
export const logoutSuccess = (): LogoutSuccessAction => ({
  type: 'LOGOUT_SUCCESS',
})

export const authenticateSuccess = (data: any): AuthenticateSuccessAction => ({
  type: 'AUTHENTICATE_SUCCESS',
  payload: data,
})

export const authenticateFailure = (): AuthenticateFailureAction => ({
  type: 'AUTHENTICATE_FAILURE',
})

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await LoginCustumer(credentials)
      if (response.status === 0) {
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refeshToken', response.data.refeshToken)
        dispatch(authenticateUser())
        return true
      }
    } catch (error) {
      dispatch(loginFailure())
    }
  }
}

export const authenticateUser = () => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await Authorization()
      if (response?.status === 1) {
        let datarefesh = await refeshToken()

        if (datarefesh) {
          localStorage.setItem('accessToken', datarefesh.data.accessToken)
          return dispatch(authenticateSuccess(datarefesh?.data.data))
        }
      } else {
        return dispatch(authenticateSuccess(response?.data))
      }
    } catch (error) {
      dispatch(authenticateFailure())
    }
  }
}

export const logoutUser = () => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refeshToken')
      let res = await Logout()
      if (res.status === 0) {
        dispatch(logoutSuccess())
        return true
      }
    } catch (error) {
      dispatch(authenticateFailure())
    }
  }
}
