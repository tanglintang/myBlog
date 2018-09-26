import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, message, Divider } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestVerifySignInInfo } from '../../reducers/signIn'

const FormItem = Form.Item

const StyledForm = styled(Form)`
  padding: 45px 15px 0;
`

const StyledSignInButton = styled(Button)`
  width: 100%;
`

class SignInForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, signInInfo) => {
      if (!err) {
        this.props.requestVerifySignInInfo(signInInfo.account, signInInfo.password)
        .then(status => {
          if (status === false) {
            message.error(this.props.message)
          }
        })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { signInStatus } = this.props

    return (
      <StyledForm onSubmit={ this.handleSubmit }>
        <Divider style={{ fontSize: 24 }}>SignIn</Divider>
        <FormItem>
          {
            getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                  message: '请输入账号！'
                }
              ]
            })(
              <Input prefix={ <Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }}></Icon> } placeholder="账号" />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码！'
                }
              ]
            })(
              <Input prefix={ <Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }}></Icon> } type="password" placeholder="密码" />
            )
          }
        </FormItem>
        <FormItem>
          <StyledSignInButton type="primary" htmlType="submit" loading={ signInStatus === 'pedding' ? true : false }>
          { signInStatus === 'pedding' ? '登录中' : '登录' }
          </StyledSignInButton>
        </FormItem>
      </StyledForm>
    )
  }
}

const WrappedSignInForm = Form.create()(SignInForm)

const mapStateToProps = state => ({
  signInStatus: state.signIn.status,
  message: state.signIn.message
})

const mapDispatchToProps = dispatch => bindActionCreators({
  requestVerifySignInInfo
}, dispatch)

WrappedSignInForm.propTypes = {
  signInStatus: PropTypes.string,
  requestVerifySignInInfo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSignInForm)
