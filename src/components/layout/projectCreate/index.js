import Login from '../../../containers/Login'
import Loader from '../../elements/loader'
import React, { Component } from 'react'
import Wizard from './wizard'

import './wizard.css'


class ProjectCreate extends Component {

  state = {
    login: false
  }

  render() {

    const loggedIn = this.props.auth.isAuthenticated
    if(this.props.auth.isRunning) return <div style={{marginTop: 120}}><Loader /></div>

    return (
      <div>

        {
          !loggedIn &&
          <div style={{textAlign: 'center', paddingTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Share Project</h1>
            <p> Welcome to <b>Welder.app</b><br></br> To share your project please sign up for a Welder.app account.</p>
            <Login />
            <div>
              <img style={{ paddingTop: '4rem', maxWidth: '280px', minWidth: '100px' }} src="/welder_logo.png"></img>
              <img style={{ paddingTop: '4rem', maxWidth: '280px', minWidth: '100px' }} src="/careables_logo.png"></img>
            </div>
          </div>
        }

        {
          loggedIn &&
          <Wizard {...this.props}/>
        }

      </div>
    );
  }
}

export default ProjectCreate;
