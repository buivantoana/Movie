import { combineReducers } from 'redux'

import gender from './reducer/gender'
import upcomming from './reducer/upcomming'
import authReducer from './reducer/auth'

const rootReducer = combineReducers({
  gender,
  upcomming,
  authReducer,
})

export default rootReducer
