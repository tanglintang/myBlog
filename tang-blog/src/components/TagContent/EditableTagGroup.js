import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tag, Input, Icon, message } from 'antd'
import { requestAddTag, requestDeleteTag } from '../../reducers/tags'
import RandomColorTag from './RandomColorTag'

const StyledRandomColorTag = Styled(RandomColorTag)`
  &&& {
    margin-top: 15px;
  }
`

class EditableTagGroup extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      inputVisible: false,
      inputValue: ''
    }
  }

  handleClose = async (e, tag) => {
    const status = await this.props.requestDeleteTag(tag)
    if (status === 'success') {
      message.success('删除成功！')
    } else {
      e.preventDefault()
      message.error('删除失败！', 1)
    }
  }

  saveInputRef = input => this.input = input

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value.trim() })
  }

  handleInputConfirm = async () => {
    const newTag = this.state.inputValue
    if (!newTag) return
    let tags = this.props.tags,
      isExist = false;
    for (const tag of tags) {
      if (tag.toLowerCase() === newTag.toLowerCase()) {
        isExist = true
        message.error('该标签已存在！')
      }
    }
    if (isExist) return
    tags = [...tags, newTag]
    const status = await this.props.requestAddTag(newTag)
    if (status === 'success') {
      message.success('添加成功！')
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  render() {
    const tags = this.props.tags
    const { inputVisible, inputValue } = this.state
    return (
      <div>
        {
          tags.map(tag => (
            <StyledRandomColorTag key={tag} closable={true} onClose={e => this.handleClose(e, tag)} >
              {tag}
            </StyledRandomColorTag>
          ))
        }
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed', marginTop: '15px' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data
})

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestAddTag, requestDeleteTag }, dispatch
)

EditableTagGroup.propTypes = {
  tags: PropTypes.array,
  requestAddTag: PropTypes.func,
  requestDeleteTag: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableTagGroup)
