import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { requestDeleteToken } from '../../reducers/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout, Icon, Button, message } from 'antd'
const { Header } = Layout

const StyledHeader = styled(Header)`
  background-color: #fff !important;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  display: flex;
  justify-content: space-between;
  padding: 0 !important;
`

const StyledIcon = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  padding: 22px 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
`

const StyledButton = styled(Button)`
  margin: 16px 16px 0 16px;
`

class HeaderCustom extends React.Component {

  handleSignOut = () => {
    this.props.requestDeleteToken().then(status => {
      if (status) {
        message.info('退出登录')
      }
    })
  }

  render() {
    const { collapsed, toggle } = this.props
    return (
      <StyledHeader>
        <StyledIcon type={ collapsed ? 'menu-unfold' : 'menu-fold' } onClick={ toggle } />
        <StyledButton onClick={ this.handleSignOut }>
          退出登录
        </StyledButton>
      </StyledHeader>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestDeleteToken },
  dispatch
)

HeaderCustom.propTypes = {
  collapsed: PropTypes.bool,
  toggle: PropTypes.func,
  requestDeleteToken: PropTypes.func
}

export default connect(null, mapDispatchToProps)(HeaderCustom)
