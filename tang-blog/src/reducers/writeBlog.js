import axios from 'axios'
import { adminAPIPrefix } from '../constants'

const types = {
  // 获取 标签 和 分类 列表
  START_GET_TAGS_LIST: 'writeBlog/START_GET_TAGS_LIST',
  SUCCESS_GET_TARS_LIST: 'writeBlog/SUCCESS_GET_TARS_LIST',
  FAILURE_GET_TAGS_LIST: 'writeBlog/FAILURE_GET_TAGS_LIST',
  SUCCESS_GET_BLOG_FROM_LOCAL: 'writeBlog/SUCCESS_GET_BLOG_FROM_LOCAL'
}

const initState = {
  status: '',
  tags: [],
  blog: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_GET_TAGS_LIST:
      return {
        ...state,
        status: 'pedding'
      }
    case types.SUCCESS_GET_TARS_LIST:
      return {
        ...state,
        status: 'success',
        tags: action.data.tags
      }
    case types.FAILURE_GET_TAGS_LIST:
      return {
        ...state,
        status: 'failure'
      }
    case types.SUCCESS_GET_BLOG_FROM_LOCAL:
      return {
        ...state,
        blog: action.data.blog
      }
    default:
      return state
  }
}

// actions 获取标签分类列表
const startGetTagsList = () => ({
  type: types.START_GET_TAGS_LIST
})

const successGetTagsList = (tags) => ({
  type: types.SUCCESS_GET_TARS_LIST,
  data: {
    tags
  }
})

const failureGetTagsList = () => ({
  type: types.FAILURE_GET_TAGS_LIST
})

// 发送请求
const requestGetTagsList = () => async dispatch => {
  dispatch(startGetTagsList())

  return await axios.get(`${adminAPIPrefix}/tags`)
  .then(res => {
    const tags = res.data.tags
    dispatch(successGetTagsList(tags))
    return 'success'
  }).catch(error => {
    console.log(error.response)
    dispatch(failureGetTagsList())
    return 'failure'
  })
  
}

// 发布新博文
const requestCreateBlog = blog => async (dispatch, getState) => {
  const token = getState().auth.token
  return await axios.post(`${adminAPIPrefix}/blogs/postBlog`, {
    token,
    ...blog
  }).then((resp) => {
    localStorage.removeItem('Drafts')
    return 'success'
  }).catch(err => {
    console.log(err)
    return 'failure'
  })
}

// 本地保存
const saveBlogToLocal = blog => dispatch => {
  localStorage.setItem('Drafts', JSON.stringify(blog))
  return 'success'
}

const successGetBlogFromLocal = (blog) => ({
  type: types.SUCCESS_GET_BLOG_FROM_LOCAL,
  data: {
    blog
  }
})

const getBlogFromLocal = () => async dispatch => {
  const blog = await localStorage.getItem('Drafts')
  dispatch(successGetBlogFromLocal(JSON.parse(blog)))
  return 'success'
}

export {
  requestCreateBlog,
  requestGetTagsList,
  saveBlogToLocal,
  getBlogFromLocal
}
