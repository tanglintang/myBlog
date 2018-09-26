import React from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import remark from 'remark'
import reactRenderer from 'remark-react'

import { Input, Select, Button, message, Modal } from 'antd'

import { requestCreateBlog, saveBlogToLocal, getBlogFromLocal } from '../../reducers/writeBlog'

import isEmptyObj from '../../utils/isEmptyObj'

// const { TextArea } = Input
const Option = Select.Option

const StyledInputGroupContainer = Styled.div`
  max-width: 650px;
  margin-left: 15px;
`

const StyledTextAreaContainer = Styled.textarea`
  height: 250px;
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

const StyledModalContainer = Styled.div`
  height: 480px;
  overflow: scroll;
  .testCode pre {
    padding: 16px;
    overflow: auto;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }
  p code {
    color: red;
  }
`

class WriteBlogInputGroup extends React.Component {

  state = {
    title: '',
    tags: [],
    markdownContent: '',
    modalVisiable: false
  }

  async componentDidMount () {
    await this.props.getBlogFromLocal().then(() => {
      this.setState({
        ...this.props.blog
      })
    })
  }

  componentWillUnmount () {
    // componentWillUnmount 生命周期 不可调用 state 或者 修改 state
    // 可重写 setState 方法防止修改
    this.setState = (state, callback)=>{
      return
    }
    const status = isEmptyObj(this.state)
    if (Object.keys(status).length !== 0) {
      this.props.saveBlogToLocal(this.state)
    }
  }   

  onInputChange = (e, name) => {
    this.setState({ [name]: e.target.value })
  }

  handleSelectChange = (name, value) => {
    this.setState({ [name]: value })
  }

  // 发布
  handleSubmit = () => {
    const hide = message.loading('发布中...')
    hide()
    this.props.requestCreateBlog(this.state).then(res => {
      if (res === 'success') {
        message.success('发布成功', 2)
        this.setState({
          tags: [],
          title: '',
          markdownContent: ''
        })
        this.props.history.push('/home')
      } else {
        message.warning('发布失败')
      }
    })
  }

  // 保存在本地
  handleLocalSave = () => {
    const status = this.props.saveBlogToLocal(this.state)
    if (status === 'success') {
      message.success('保存成功', 2)
    } else {
      message.error('保存失败，请稍后重试')
    }
  }

  // 预览
  handlePreview = () => {
    this.setState({
      modalVisiable: true
    })
  }

  handleModalOk = () => {
    this.setState({
      modalVisiable: false
    })
  }

  render () {
    const tags = this.props.tags
    return (
      <StyledInputGroupContainer>
        <Input placeholder="标题" value={ this.state.title } onChange={ e => this.onInputChange(e, 'title') } />
        <Select mode="tags" style={{ width: '100%', marginTop: '15px' }} placeholder="选择标签" value={this.state.tags} onChange={ value => this.handleSelectChange('tags', value) }>
          {
            tags.map(item => ( <Option key={item}>{item}</Option> ))
          }
        </Select>
        <StyledTextAreaContainer placeholder="markdown 格式的文章内容" value={ this.state.markdownContent } onChange={ e => this.onInputChange(e, 'markdownContent') } style={{ marginTop: '15px' }} />
        <Button type="primary" style={{ marginTop: '15px', marginRight: '20px' }} onClick={ this.handleSubmit }>
          发布
        </Button>
        <Button type="primary" style={{ marginTop: '15px', marginRight: '20px' }} onClick={ this.handleLocalSave }>
          保存
        </Button>
        <Button type="primary" style={{ marginTop: '15px', marginRight: '20px' }} onClick={ this.handlePreview }>
          预览
        </Button>
        <Modal visible={ this.state.modalVisiable } title="文章预览" width={'900px'} onOk={ this.handleModalOk } onCancel={ this.handleModalOk } footer={null} style={{ top: '40px' }}>
          <StyledModalContainer>
            <div id='preview' className="testCode">
              {remark().use(reactRenderer).processSync(this.state.markdownContent).contents}
            </div>
          </StyledModalContainer>
        </Modal>
      </StyledInputGroupContainer>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.writeBlog.tags,
  blog: state.writeBlog.blog
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { requestCreateBlog, saveBlogToLocal, getBlogFromLocal }, dispatch
  )

WriteBlogInputGroup.propTypes = {
  tags: PropTypes.array,
  requestCreateBlog: PropTypes.func,
  saveBlogToLocal: PropTypes.func,
  getBlogFromLocal: PropTypes.func
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WriteBlogInputGroup)
)
