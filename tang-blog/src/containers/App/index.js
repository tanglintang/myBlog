import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import Main from '../Main'
import { LoadingPage } from '../../components/LoadingPage'
import { domainSubDir } from '../../constants'
import { getIncorrectToken, requestVerifyToken } from '../../reducers/auth'
import './App.css'

class App extends React.Component {
  componentDidMount () {
    const adminToken = localStorage.getItem('adminToken')
    adminToken ? this.props.requestVerifyToken(adminToken) : this.props.getIncorrectToken()
    
  }

  render () {
    const getContentByTokenAuth = authStatus => {
      if (authStatus === 'success') {
        return (
          <Main />
        )
      } else if (authStatus === 'failure') {
        return (
          <div>
            <Route path="/register" component={ SignUp } />
            <Route path="/login" component={SignIn} />
            <Redirect from="*" to="/login" />
          </div>
        )
      } else {
        return <LoadingPage />
      }
    }

    return (
      <Router basename={ domainSubDir }>
        <Switch>
          { getContentByTokenAuth(this.props.authStatus) }
        </Switch>
      </Router>
    )
  }
}

App.propTypes = {
  authStatus: PropTypes.string,
  requestVerifyToken: PropTypes.func,
  getIncorrectToken: PropTypes.func
}

const mapStateToProps = state => ({
  authStatus: state.auth.status
})

// bindActionCreators 
// 把 action creators 转成拥有同名 keys 的对象
// 需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 Redux store 或 dispatch 传给它。
const mapDispatchToProps = dispatch => bindActionCreators({
  getIncorrectToken,
  requestVerifyToken
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
