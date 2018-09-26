import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Divider } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UploadPic from '../../components/UploadFile'
import { requestSignUpAccount } from '../../reducers/signUp'

const FormItem = Form.Item

const StyledForm = styled(Form)`
  padding: 45px 15px 0;
`

const StyledSignInButton = styled(Button)`
  width: 100%;
`

class SignUpForm extends React.Component {
  state = {
    confirmDirty: false,
    avatar: {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, signUpInfo) => {
      signUpInfo.upload = this.state.avatar.thumbUrl ? this.state.avatar.thumbUrl : ''
    if (!err) {
        this.props.requestSignUpAccount(signUpInfo).then(res => {
          if (res) {
            window.location.pathname = '/admin/main'
          }
        })
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  getUploadFile = (fileList) => {
    this.setState({
      avatar: fileList[0]
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <Divider style={{ fontSize: 24 }}>SignUp</Divider>
        <FormItem
          {...formItemLayout}
          label="account"
        >
          { getFieldDecorator('account', {
              rules: [{ required: true, message: 'Please input your account' }]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }}></Icon>} placeholder="account" />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="password"
        >
          { getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }}></Icon>} type="password" placeholder="password" />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="confirm"
        >
          { getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }}></Icon>} type="password" placeholder="confirm password" onBlur={this.handleConfirmBlur} />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="avatar"
        >
        { getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(<UploadPic getUploadFile={ this.getUploadFile} />)
        }
        </FormItem>
        <FormItem>
          <StyledSignInButton type="primary" htmlType="submit">
            注册
          </StyledSignInButton>
        </FormItem>
      </StyledForm>
    )
  }
}

const WrappedSignUpForm = Form.create()(SignUpForm)

const mapStateToProps = state => ({
  signUpStatus: state.signUp.status,
  message: state.signUp.message
})

const mapDispatchToProps = dispatch => bindActionCreators({
  requestSignUpAccount
}, dispatch)

WrappedSignUpForm.propTypes = {
  signUpStatus: PropTypes.string,
  message: PropTypes.string,
  requestSignUpAccount: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSignUpForm)
