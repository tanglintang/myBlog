import axios from 'axios'
import { adminAPIPrefix } from '../constants'

const types = {
  STATR_GET_BLOG_LIST: 'blogList/STATR_GET_BLOG_LIST',
  SUCCESS_GET_BLOG_LIST: 'blogList/SUCCESS_GET_BLOG_LIST',
  FAILURE_GET_BLOG__LIST: 'blogList/FAILURE_GET_BLOG__LIST'
}

const initState = {
  status: '',
  list: [],
  amount: 0,
  tags: [],
  page: 1
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.STATR_GET_BLOG_LIST:
      return {
        ...state,
        status: 'pedding'
      }
    case types.SUCCESS_GET_BLOG_LIST:
      return {
        ...state,
        status: 'success',
        list: Object.assign(state.list, action.data.list),
        amount: action.data.count,
        tags: action.data.tags,
        page: action.data.page
      }
    case types.FAILURE_GET_BLOG__LIST:
      return {
        ...state,
        status: 'failure'
      }
    default:
      return state
  }
}

// actions
const startGetBlogList = () => ({
  type: types.STATR_GET_BLOG_LIST
})
const successGetBlogList = (list, count, tags, page) => ({
  type: types.SUCCESS_GET_BLOG_LIST,
  data: {
    list,
    count,
    tags,
    page
  }
})
const failureGetBlogList = () => ({
  type: types.FAILURE_GET_BLOG__LIST
})


// 发送获取博客请求
const requestGetBlogList = (page = 1, pageSize = 5) => dispatch => {
  dispatch(startGetBlogList())
  return axios.get(`${adminAPIPrefix}/blogs/getBlogs`, {
    params: {
      page,
      pageSize
    }
  }).then(res => {
    const {list, count, tags} = res.data
    list.forEach((item, index) => {
      list[index].tags = item.tags.split(',')
    })
    dispatch(successGetBlogList(list, count, tags, page))
  }).catch(error => {
    dispatch(failureGetBlogList())
    console.log(error.response)
  })
}

// 删除博客
const requestDeleteBlog = id => dispatch => {
  return axios.delete(`${adminAPIPrefix}/blogs/delBlog`, {
    params: {
      id
    }
  }).then(res => {
    console.log(res)
    return 'success'
  }).catch(error => {
    console.log(error.response)
    return 'failure'
  })
}

// 更新博客
const requestUpdateBlog = (blog) => dispatch => {
  
  return axios.put(`${adminAPIPrefix}/blogs/updateBlog`, {
    blog
  }).then(res => {
    console.log(res)
    return 'success'
  }).catch(error => {
    console.log(error.response)
    return 'failure'
  })
}

export {
  requestGetBlogList,
  requestDeleteBlog,
  requestUpdateBlog
}
