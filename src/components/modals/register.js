import React, { Component } from 'react'

import ModalFrame from './base/modalFrame'
import TextField from '../elements/inputs/textField'
import Button from '../elements/button'
import { Link } from 'react-router-dom'
import UserRegisterForm from '../layout/register/registerForm'


const titleDefault = {
  title: 'Join Wevolver',
  subtitle: null
}

export default class RegisterModal extends Component {

  constructor(props) {
    super(props)
      this.state = {
        ...titleDefault
      }
  }

  onChangeStep = (step) => {
    this.setState({
      step
    })
  }

  onBack = (event) => {

  }


  render() {
    const {
      onDismiss,
      unsetCommentBuffer,
      cancelFollowProject,
    } = this.props
    let dismiss = () => {
      onDismiss()
      unsetCommentBuffer()
      console.log('cancel')
      cancelFollowProject()
    }
    return (
      <ModalFrame register={true} title={this.state.step > 1 ? 'Personalize your account' : 'Join Wevolver'} subtitle={this.state.step > 1 ? null : null} cancelFollowProject={cancelFollowProject} onDismiss={dismiss}>
        <UserRegisterForm
          {...this.props}
          onChangeStep={this.onChangeStep}
        />
        <div className="modal-signup">
          Already have an account? <a style={{cursor: 'pointer'}} onClick={()=> this.props.switchModal('login')}>Sign in.</a>
        </div>
      </ModalFrame>
    )
  }
}
