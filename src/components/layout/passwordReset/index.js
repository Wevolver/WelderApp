import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Footer from '../footer/footer'
import PasswordResetForm from './passwordResetForm'
import { Redirect } from 'react-router'

import './passwordReset.css'

class PasswordReset extends Component {
  onSubmit = () => {
    const {
      newPassword,
      match: { params }
    } = this.props
    newPassword(params)
  }

  render () {
    const {
      registerUser,
      formState,
      registering,
      match } = this.props
    return(
      <MainContainer style={{padding: 0, maxWidth: 'none'}}>
        <div className="reset-page">
          <h1 id="site-content">Rest Password</h1>
          <PasswordResetForm
            onSubmit={this.onSubmit}
          />
        </div>
      <Footer/>
      </MainContainer>
    )
  }
}

export default PasswordReset
