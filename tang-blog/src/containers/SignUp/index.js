import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SignUpForm from './SignUpForm'

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledContentContainer = styled.div`
  width: 480px;
  height: 640px;
  padding: 30px;
  background-color: #f6f6f6;
  border: 1px solid #d8d8d8;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  text-align: center;
`

class SignUp extends React.Component {
  render () {
    return (
      <StyledContainer>
        <StyledContentContainer>
          <SignUpForm />
          <Link to="/login">已有账号，直接登录</Link>
        </StyledContentContainer>
      </StyledContainer>
    )
  }
}

export default SignUp
