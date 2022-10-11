import { combineReducers } from 'redux'
import login from './login'
import user from './user'

// 组合各个 reducer 函数，成为一个根 reducer
export default combineReducers({
  login,
  user
})
