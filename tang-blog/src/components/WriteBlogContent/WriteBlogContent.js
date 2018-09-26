import React from 'react'
import { Layout, Divider } from 'antd'
import Styled from 'styled-components'
import WriteBLogInputGroup from './WriteBlogInputGroup'

const { Content } = Layout

const StyledContent = Styled(Content)`
  &&& {
    margin: 24px;
    padding: 30px;
    background: #fff;
  }
`

class WriteBlogContent extends React.Component {
  render () {
    return (
      <StyledContent>
        <h3>写博客</h3>
        <Divider dashed />
        <WriteBLogInputGroup />
      </StyledContent>
    )
  }
}

export default WriteBlogContent
