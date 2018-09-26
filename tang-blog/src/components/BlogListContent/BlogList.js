import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { List, Icon, Button, Popconfirm, message, Pagination  } from 'antd'
import { blogListPrePageSize } from '../../constants'
import EditableBlogModal from './EditableBlogModal'
import { requestDeleteBlog, requestGetBlogList } from '../../reducers/blogList'
import RandomColorTag from '../TagContent/RandomColorTag'

class BlogList extends React.Component {

  state = {
    visibleBlogId: '',
    current: 1
  }

  componentDidMount () {
    this.setState({
      current: this.props.page
    })
  }

  confirmDeleteBlog = (id) => {
    this.props.requestDeleteBlog(id).then(status => {
      if (status === 'success') {
        message.success('博客删除成功')
        this.props.requestGetBlogList()
        this.props.history.push('/home')
      } else {
        message.error('博客删除失败')
      }
    })
    
  }

  showVisibleModel = (id) => {
    this.setState({
      visibleBlogId: id
    })
  }

  clearVisibleBlogId = () => {
    this.setState({ visibleBlogId: '' })
  }

  render () {
    const { visibleBlogId, current } = this.state
    const { list, amount  } = this.props

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )

    const pagination = {
      pageSize: blogListPrePageSize,
      total: amount,
      current,
      onChange: page => {
        this.props.requestGetBlogList(page)
      }
    }
    
    return (
      <List itemLayout="vertical" dataSource={list} pagination={pagination} size="large" renderItem={item => (
        <List.Item key={item.id} actions={[
          <IconText type="clock-circle-o" text={item.createTime.toLocaleString()} />,
          <IconText type="eye-o" text={item.viewTimes} />,
          <IconText type="tags-o" text={item.tags.map(tag => (<RandomColorTag key={tag}>{tag}</RandomColorTag>))} />
        ]} extra={[
          <span style={{ marginRight: '20px' }}>
            <Button size="small" type="primary" icon="edit" onClick={() => this.showVisibleModel(item.id)}>编辑</Button>
            {visibleBlogId === item.id ? (
              <EditableBlogModal blog={item} clearVisibleBlogId={this.clearVisibleBlogId} />
            ) : (undefined)}
          </span>,
          <Popconfirm title="确定要删除吗？" onConfirm={() => this.confirmDeleteBlog(item.id)} okText="确定" cancelText="取消">
            <Button size="small" icon="delete" type="danger">删除</Button>
          </Popconfirm>,
        ]}>
          <List.Item.Meta title={<a>{item.title}</a>} />
        </List.Item>
      )} />
    )
  }
}

const mapStateToProps = state => ({
  list: state.blogList.list,
  tags: state.blogList.tags,
  amount: state.blogList.amount,
  page: state.blogList.page
})

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestGetBlogList, requestDeleteBlog }, dispatch
)

BlogList.propTypes = {
  amount: PropTypes.number,
  page: PropTypes.number,
  list: PropTypes.array,
  requestDeleteBlog: PropTypes.func,
  requestGetBlogList: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogList))
