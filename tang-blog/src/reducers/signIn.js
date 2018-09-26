import axios from 'axios'
import { adminAPIPrefix } from '../constants'
import { getCorrectToken } from './auth'

// actionTypes
const types = {
  START_VERIFY_SIGNIN_INFO: 'signIn/START_VERIFY_SIGNIN_INFO',
  GET_CORRECT_SIGNIN_TOKEN: 'signIn/GET_CORRECT_SIGNIN_TOKEN',
  GET_INCORRECT_SIGNIN_TOKEN: 'signIn/GET_INCORRECT_SIGNIN_TOKEN'
}

const initState = {
  status: '',
  message: ''
}

// reducers
export default (state = initState, action) => {
  switch (action.type) {
    case types.START_VERIFY_SIGNIN_INFO:
      return {
        status: 'pedding'
      } 
    case types.GET_CORRECT_SIGNIN_TOKEN:
      return {
        status: 'success'
      } 
    case types.GET_INCORRECT_SIGNIN_TOKEN:
      return {
        ...state,
        status: 'failure',
        message: action.playload.message
      } 
    default:
      return state
  }
}

// action
export const startVerifySignInInfo = () => ({
  type: types.START_VERIFY_SIGNIN_INFO
})

export const getCorrectSignInToken = () => ({
  type: types.GET_CORRECT_SIGNIN_TOKEN
})

export const getIncorrectSignInToken = (message) => ({
  type: types.GET_INCORRECT_SIGNIN_TOKEN,
  playload: {
    message
  }
})

export const requestVerifySignInInfo = (account, password) => dispatch => {
  dispatch(startVerifySignInInfo()) // pedding
  // 发送验证登录信息请求
  return axios.post(`${adminAPIPrefix}/signIn`, {
    account,
    password
  }).then(response => {
    // 写入 localStorage
    const token = response.data.token
    const message = response.data.message

    if (token) {
      localStorage.setItem('adminToken', token)
      dispatch(getCorrectSignInToken())
      dispatch(getCorrectToken(token))
      return true
    } else {
    console.log(message)
    dispatch(getIncorrectSignInToken(message))
      return false
    }
  }).catch(error => {
    console.log(error)
    dispatch(getIncorrectSignInToken())
    return false
  })
}
