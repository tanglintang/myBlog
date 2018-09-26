import axios from 'axios'
import { getIncorrectSignInToken } from './signIn'
import { adminAPIPrefix } from '../constants'

const types = {
  START_VERIFY_TOKEN: 'auth/START_VERIFY_TOKEN',
  GET_CORRECT_TOKEN: 'auth/GET_CORRECT_TOKEN',
  GET_INCORRECT_TOKEN: 'auth/GET_INCORRECT_TOKEN',

  CORRECT_DELETE_TOKEN: 'auth/CORRECT_DELETE_TOKEN'
}

const initState = {
  status: '',
  token: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_VERIFY_TOKEN:
      return {
        ...state,
        status: 'pedding'
      }
    case types.GET_CORRECT_TOKEN:
      return {
        status: 'success',
        token: action.playload.token
      }
    case types.GET_INCORRECT_TOKEN:
      return {
        ...state,
        status: 'failure'
      }
    case types.CORRECT_DELETE_TOKEN:
      return {
        status: 'failure',
        token: ''
      }
    default:
      return state
  }
}

export const startVerifyToken = () => ({
  type: types.START_VERIFY_TOKEN
})

export const getCorrectToken = token => ({
  type: types.GET_CORRECT_TOKEN,
  playload: {
    token
  }
})

export const getIncorrectToken = () => ({
  type: types.GET_INCORRECT_TOKEN
})

export const correctDeleteToken = () => ({
  type: types.CORRECT_DELETE_TOKEN
})

export const requestVerifyToken = token => async dispatch => {
  dispatch(startVerifyToken())  // pedding
  // 发送验证 token 请求
  await axios.get(`${adminAPIPrefix}/signIn/token`, {
    headers: {
      'Authorization': token
    }
  }).then(() => {
    dispatch(getCorrectToken(token))  // success

  }).catch(error => {
    console.log(error)
    dispatch(getIncorrectToken())
  })
}

export const requestDeleteToken = () => (dispatch, getState) => {
  // 获取 redux store 中的 token
  const token = getState().auth.token
  console.log(token)
  return axios.delete(`${adminAPIPrefix}/signIn/token`, {
    headers: {
      'Authorization': token
    }
  }).then(resp => {
    localStorage.removeItem('adminToken')
    dispatch(getIncorrectToken())
    dispatch(getIncorrectSignInToken())
    return true
  })
}
