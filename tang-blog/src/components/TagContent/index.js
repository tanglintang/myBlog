import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TagContent from './TagContent'
import { requestGetTags } from '../../reducers/tags'
import LoadingContent from '../LoadingPage/LoadingContent'

class TagContentContainer extends React.Component {

  componentDidMount () {
    this.props.requestGetTags()
  }

  render () {
    const status = this.props.status
    return status === 'success' ? (
      <TagContent />
    ) : (
      <LoadingContent>
        {status !== 'failure' ? '加载中...' : '加载数据失败，请刷新页面重试'}
      </LoadingContent>
    )
  }
}

const mapStateToProps = state => ({
  status: state.tags.status
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { requestGetTags }, dispatch
  )

TagContentContainer.propTypes = {
  status: PropTypes.string,
  requestGetTags: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(TagContentContainer)
