import axios from 'axios'
import { adminAPIPrefix } from '../constants'

const types = {
  // 获取标签
  START_GET_TAGS: 'tags/START_GET_TAGS',
  SUCCESS_GET_TAGS: 'tags/SUCCESS_GET_TAGS',
  FAILURE_GET_TAGS: 'tags/FAILURE_GET_TAGS',

  // 新建标签
  SUCCESS_ADD_TAG: 'tags/SUCCESS_ADD_TAG',
  // 删除标签
  SUCCESS_DELETE_TAG: 'tags/SUCCESS_DELETE_TAG',
}

const initState = {
  status: '',
  data: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_GET_TAGS:
      return {
        data: [],
        status: 'pending'
      }
    case types.SUCCESS_GET_TAGS:
      return {
        data: action.data,
        status: 'success'
      }
    case types.FAILURE_GET_TAGS:
      return {
        data: [],
        status: 'failure'
      }
    case types.SUCCESS_ADD_TAG:
      return {
        ...state,
        data: [...state.data, action.data]
      }
    case types.SUCCESS_DELETE_TAG:
      return {
        ...state,
        data: state.data.filter(tag => tag !== action.data)
      }
    default:
      return state
  }
} 

const startGetTags = () => ({
  type: types.START_GET_TAGS
})

const successGetTags = tags => ({
  type: types.SUCCESS_GET_TAGS,
  data: tags
})

const failureGetTags = () => ({
  type: types.FAILURE_GET_TAGS
})

// 获取所有标签
const requestGetTags = () => async (dispatch, getState) => {
  dispatch(startGetTags())

  const token = getState().auth.token

  return await axios.get(`${adminAPIPrefix}/tags`, {
    headers: {
      'Authorization': token
    }
  }).then(res => {
    const tags = res.data.tags
    dispatch(successGetTags(tags))
    return 'success'
  }).catch(err => {
    dispatch(failureGetTags())
    console.log(err)
    return 'failure'
  })
}

// 添加标签
const successAddTag = newTag => ({
  type: types.SUCCESS_ADD_TAG,
  data: newTag
})

const requestAddTag = (newTag) => async dispatch => {
  return await axios.post(`${adminAPIPrefix}/tags`, {
    tagName: newTag
  }).then(() => {
    dispatch(successAddTag(newTag))
    return 'success'
  }).catch(error => {
    console.log(error.response)
    return 'failure'
  })
}

// 删除标签
const successDeleteTag = (tag) => ({
  type: types.SUCCESS_DELETE_TAG,
  data: tag
})

const requestDeleteTag = tag => async dispatch => {
  return await axios.delete(`${adminAPIPrefix}/tags`, {
    headers: {
      tag
    }
  }).then(res => {
    dispatch(successDeleteTag(tag))
    return 'success'
  }).catch(error => {
    console.log(error.response)
    return 'error'
  })
}

export {
  requestGetTags,
  requestAddTag,
  requestDeleteTag
}
