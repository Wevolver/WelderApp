import React from 'react'
import './navbar.css'
import MainContainer from '../../components/layout/mainContainer'
import Tabs from './tabs'

const Navbar = ({ children, tabs, onTabSelect, style, fitted }) => (

      <MainContainer style={Object.assign({}, {background: '#f7f9fa', borderBottom: '1px solid #bdbdbd'}, style)}>
        <div className={fitted ? "sub-navbar fitted" : "sub-navbar"}>
          <div className="sub-navbar-flex">
            {children}
          </div>
          {tabs &&
              <Tabs tabs={tabs} onTabSelect={onTabSelect}/>
        }
        </div>
      </MainContainer>
)

export default Navbar
