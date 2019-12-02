import React, { Component } from 'react'

import ModalFrame from './base/modalFrame'
import TextField from '../elements/inputs/textField'
import Button from '../elements/button'
import LoginForm from '../layout/login/loginForm'
import { Link } from 'react-router-dom'

class LoginModal extends Component {
  render() {
    const {
      onDismiss,
      unsetCommentBuffer
    } = this.props

    let dismiss = () => {
      onDismiss()
      unsetCommentBuffer()
    }

    return (
      <ModalFrame title="Log In" onDismiss={dismiss}>
        <LoginForm  {...this.props}/>
        <div className="modal-signup">
          New to Wevolver? <a style={{cursor: 'pointer'}} onClick={()=> this.props.switchModal('register')}>Sign up here.</a>
        </div>
      </ModalFrame>
    )
  }
}

export default LoginModal
