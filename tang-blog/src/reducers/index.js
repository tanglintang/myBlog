import { combineReducers } from 'redux'
import auth from './auth'
import signIn from './signIn'
import signUp from './signUp'
import blogList from './blogList'
import writeBlog from './writeBlog'
import tags from './tags'

export default combineReducers ({
  auth,
  signIn,
  signUp,
  writeBlog,
  tags,
  blogList
})
