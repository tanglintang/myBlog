import axios from 'axios'
import { adminAPIPrefix } from '../constants'
import { getCorrectToken } from './auth'

// actionTypes
const types = {
  START_SIGNUP_ACCOUNT: 'signIn/START_SIGNUP_ACCOUNT',
  SIGNUP_FAILED: 'SIGNUP_FAILED',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS'
}

const initState = {
  status: '',
  message: ''
}

// reducers
export default (state = initState, action) => {
  switch (action.type) {
    case types.START_SIGNUP_ACCOUNT:
      return {
        status: 'pedding'
      }
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.playload.message
      }
    case types.SIGNUP_FAILED:
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
export const startSignUpAccount = () => ({
  type: types.START_SIGNUP_ACCOUNT
})

export const signUpSuccess = (message) => ({
  type: types.SIGNUP_SUCCESS,
  playload: {
    message
  }
})

export const signUpFailed = (message) => ({
  type: types.SIGNUP_FAILED,
  playload: {
    message
  }
})

export const requestSignUpAccount = (signUpInfo) => async dispatch => {
  dispatch(startSignUpAccount)

  return await axios.post(`${adminAPIPrefix}/signUp`, signUpInfo)
    .then(response => {
      const { message, token } = response.data
      if (token) {
        localStorage.setItem('adminToken', token)
        dispatch(signUpSuccess(message))
        dispatch(getCorrectToken(token))
        return true
      } else {
        dispatch(signUpFailed(message))
        return false
      }
    }).catch(error => {
      console.error(error)
      return false
    })
}