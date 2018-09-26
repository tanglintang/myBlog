import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SignInForm from './SignInForm'
// import adminImg from '../../logo.svg'

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledContentContainer = styled.div`
  width: 380px;
  height: 480px;
  padding: 30px;
  background-color: #f6f6f6;
  border: 1px solid #d8d8d8;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  text-align: center;
`

class SignIn extends React.Component {
  render () {
    return (
      <StyledContainer>
        <StyledContentContainer>
          {/* <img src={ adminImg } alt="admin"/> */}
          <SignInForm />
          <Link to="/register">还没有账号？注册一个吧</Link>
        </StyledContentContainer>
      </StyledContainer>
    )
  }
}

export default SignIn
