import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Splash from './partials/splash.js'
import Footer from '../footer/footer'
import { Redirect } from 'react-router'

import './register.css'

class Register extends Component {
  componentWillMount() {}

  render () {
  const {
    source,
    careables,
    auth } = this.props
  if(auth.isAuthenticated && source !== 'follow' && !careables) return (<Redirect to={`/profile/${auth.slug}`} />)
  return(
    <MainContainer style={{padding: 0, maxWidth: 'none'}}>
      <div className="register-page" id="site-content">
        <Splash
          {...this.props}
        />
        {!careables && <Footer/>}
      </div>
    </MainContainer>
    )
  }
}

export default Register
