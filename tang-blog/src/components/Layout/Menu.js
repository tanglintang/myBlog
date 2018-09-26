import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Menu, Icon } from 'antd'
import { domainSubDir } from '../../constants'

const StyledLogoDiv = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`

class MenuCustom extends Component {
  // 选择当前路径匹配的 menu key
  getSelectedKeys = (menus) => {
    const pathname = window.location.pathname
    for (let item of menus) {
      const regExpPathname = new RegExp('^' + domainSubDir + item.to)
      if (regExpPathname.test(pathname)) {
        return [item.key]
      }
    }
    // 未匹配到，返回首页的key
    return [menus[0].key]
  }
  renderMenus = menus =>
    menus.map(item => (
      <Menu.Item key={item.key}>
        <Link to={item.to}>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    ))

  render () {
    return (
      <Menu theme="dark" mode="inline" selectedKeys={this.getSelectedKeys(this.props.menus)} >
        <StyledLogoDiv />
        { this.renderMenus(this.props.menus) }
      </Menu>
    )
  }
}

MenuCustom.propTypes = {
  menus: PropTypes.array
}

export default MenuCustom
