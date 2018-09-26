import React from 'react'
import Styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import Sider from '../../components/Layout/Sider'
import Header from '../../components/Layout/Header'
import BlogListContent from '../../components/BlogListContent'
import WriteBlogContent from '../../components/WriteBlogContent'
import TagContentContainer from '../../components/TagContent'
import UserManagement from '../../components/UserManagementContent'
import MineContent from '../../components/MineContent'
import NotFoundPage from '../../components/NotFoundPage'
import { Layout } from 'antd'

import menus from '../../constants/menu'

const StyledRightLayout = Styled(Layout) `
  &&& {
    height: 100vh;
    overflow: scroll;
    position: relative;
  }
`

class MainPage extends React.Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={ this.state.collapsed } menus={menus} />
        <StyledRightLayout id="my-scroll-layout">
          <Header collapsed={ this.state.collapsed } toggle={ this.toggle }></Header>
          <Switch>
            <Route exact path="/" component={BlogListContent}></Route>
            <Route path="/home" component={BlogListContent}></Route>
            <Route path="/writeblog" component={WriteBlogContent}></Route>
            <Route path="/userManagement" component={UserManagement}></Route>
            <Route path="/tags" component={TagContentContainer}></Route>
            <Redirect from="/login" to="/home" />
            <Redirect from="/register" to="/home" />
            <Route path="/mine" component={MineContent}></Route>
            <Route path='/404' component={NotFoundPage} />
            <Redirect from='*' to='/404' />
          </Switch>
        </StyledRightLayout>
      </Layout>
    )
  }
}

export default MainPage
