import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Input, Select, message, Modal, Button } from 'antd'
import { requestGetBlogList, requestUpdateBlog } from '../../reducers/blogList'
import { requestGetTagsList } from '../../reducers/writeBlog'

const Option = Select.Option

const StyledTextAreaContainer = Styled.textarea`
  height: 300px;
  width: 100%;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  &:hover {
    border-color: #40a9ff;
  }
  ::-webkit-input-placeholder {
    color: #BFBFBF;
  }
`

class EditableBlogModal extends React.Component {

  constructor (props) {
    super (props)

    this.state = {
      blog: {
        ...this.props.blog
      },
      visible: true,
      loading: false
    }
  }

  componentDidMount () {
    this.props.requestGetTagsList()
  }

  handleOk = () => {
    this.setState({ loading: true })
    const blog = this.state.blog
    this.props.requestUpdateBlog(blog).then(status => {
      if (status === 'success') {
        message.success('文章更新成功')
        this.props.requestGetBlogList()
        this.props.history.push('/home')
        setTimeout(() => {
          this.setState({ visible: false })
        }, 1000)
      } else {
        this.setState({ loading: false })
        message.error('文章更新失败')
      }
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
    this.props.clearVisibleBlogId()
  }

  handleInputChange = (e, name) => {
    this.setState({
      blog: {
        ...this.state.blog,
        [name]: e.target.value
      }
    })
  }

  handleSelectChange = (name, value) => {
    this.setState({
      blog: {
        ...this.state.blog,
        [name]: value
      }
    })
  }

  render () {
    const { tags } = this.props
    const { blog, loading, visible } = this.state
    return (
      <Modal title="文章编辑" visible={visible}  width={'900px'} onOk={ this.handleOk } onCancel={ this.handleCancel } footer={[
        <Button key="取消" onClick={ this.handleCancel }>取消</Button>,
        <Button key="提交" type="primary" loading={loading} onClick={this.handleOk}>提交</Button>
      ]}>
        <Input placeholder="标题" value={blog.title} onChange={e => this.handleInputChange(e, 'title')} />
        <Select mode="multiple" style={{ width: '100%', marginTop: '15px' }} placeholder="选择标签" onChange={ value => this.handleSelectChange('tags', value)} value={blog.tags} >
          { tags.map(tag => <Option key={tag}>{tag}</Option>) }
        </Select>
        <StyledTextAreaContainer placeholder="markdown格式的文章内容" value={blog.markdownContent} onChange={e => this.handleInputChange(e, 'markdownContent')} style={{ marginTop: '15px'}} />
      </Modal>
    )
  }
}

EditableBlogModal.propTypes = {
  blog: PropTypes.object,
  clearVisibleBlogId: PropTypes.func,
  requestUpdateBlog: PropTypes.func,
  requestGetBlogList: PropTypes.func
}

const mapStateToProps = state => ({
  tags: state.writeBlog.tags
})

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestGetBlogList, requestGetTagsList, requestUpdateBlog }, dispatch
)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditableBlogModal)
)
