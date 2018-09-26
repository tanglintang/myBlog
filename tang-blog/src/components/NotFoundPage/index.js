import React, { Component } from 'react'
import Styled from 'styled-components'
import NotFoundImg from './404.png'

const StyledNotFoundContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
`

export default class NotFound extends Component {
  render() {
    return (
      <StyledNotFoundContainer>
        <img src={NotFoundImg} />
      </StyledNotFoundContainer>
    )
  }
}