import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoadingContent from '../LoadingPage/LoadingContent'
import { requestGetTagsList } from '../../reducers/writeBlog'
import WriteBlogContent from './WriteBlogContent'

class WriteBlogContentContainer extends React.Component {
  componentDidMount() {
    this.props.requestGetTagsList()
  }

  render() {
    const status = this.props.status
    return (
      status === 'success' ? (<WriteBlogContent />) : (<LoadingContent status={status} />)
    )
  }
}

const mapStateToProps = state => ({
  status: state.writeBlog.status
})

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { requestGetTagsList }, dispatch
)

WriteBlogContentContainer.propTypes = {
  status: PropTypes.string,
  requestGetTagsList: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteBlogContentContainer)
