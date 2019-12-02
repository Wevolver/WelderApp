import React, { Component } from 'react'
import Register from '../../containers/Register'
import Login from '../../containers/Login'
import Wizard from './wizard'
import Loader from '../elements/loader'

import './wizard.css'

class Careables extends Component {
  state = {
    login: false
  }
  render() {
    const loggedIn = this.props.auth.isAuthenticated
    if(this.props.auth.isRunning) return <div style={{marginTop: 120}}><Loader /></div>
    return (
      <div>
        {!loggedIn && <div style={{paddingTop: 64}}>
           <Login />
        </div>}
        {loggedIn &&
          <Wizard {...this.props}/>
        }
      </div>
    );
  }
}

export default Careables;
