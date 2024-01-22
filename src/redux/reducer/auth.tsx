/* eslint-disable */
import { AuthActionTypes } from '../action/actionLoginReduxThunk'

interface AuthState {
  datauser: any | null // Adjust the type accordingly
  error: string | null
}

const initialState: AuthState = {
  datauser: null,
  error: null,
}

const authReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, error: null }
    case 'LOGIN_FAILURE':
      return { ...state }
    case 'AUTHENTICATE_SUCCESS':
      return { ...state, datauser: action.payload }
    case 'AUTHENTICATE_FAILURE':
      return { ...state }
    case 'LOGOUT_SUCCESS':
      return { ...state, datauser: {} }
    default:
      return state
  }
}

export default authReducer
