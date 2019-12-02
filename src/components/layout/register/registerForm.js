import React, { Component } from 'react';
import { Field, reduxForm, isDirty } from 'redux-form'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

import TextField from '../../elements/inputs/textField'
import Button from '../../elements/button'
import CheckboxField from '../../elements/checkbox'
import { API } from '../../../constants/api'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { heapEvent } from '../../../modules/heap'

const cookies = new Cookies();
const required = value => value ? undefined : 'Required'
const isEmail = value => {
  value && !/(?=[a-z0-9@.!#$%&'*+/=?^_`{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(value) ? 'Invalid email address' : undefined
}

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength8 = minLength(8)


class UserRegisterForm extends Component {

  state = {
    step: 1
  }

  componentDidMount = () => {
    const {
      registerUser,
      afterBookmark,
      afterFollow,
      commenting,
      unsetCommentBuffer
    } = this.props
    if(this.state.step === 1){
      if(cookies.get('accepts-cookies')){
        let label = "Login Button"
        if(afterBookmark){
          label = "Follow Project"
        }
        if(afterFollow){
          label = "Follow Tag"
          heapEvent.track('Clicked Register After Trying To Follow Tag');
        }
        if(commenting){
          label = "Comment Button"
          heapEvent.track('Clicked Register After Trying To Comment');
        }
        ReactGA.event({
          category: 'Activation',
          action: 'Register Step 1',
          label: label
        });
      }
    }
  }

  onSubmit = (data) => {
    const {
      registerUser,
      afterFollow,
      afterBookmark,
      commenting,
      unsetCommentBuffer
    } = this.props
    if(cookies.get('accepts-cookies')){
      let label = "Login Button"
      if(afterBookmark){
        label = "Follow Project"
      }
      if(afterFollow){
        label = "Follow Tag"
      }
      if(commenting){
        label = "Comment Button"
        unsetCommentBuffer()
      }
      ReactGA.event({
        category: 'Activation',
        action: 'Registered',
        label: label
      });
    }
    registerUser()
  }

  changeStep = (event, step) => {
    const {
      afterBookmark,
      afterFollow,
      commenting,
      unsetCommentBuffer,
      onChangeStep
    } = this.props

    if(cookies.get('accepts-cookies')){
      let label = "Login Button"
      if(afterBookmark){
        label = "Follow Project"
      }
      if(afterFollow){
        label = "Follow Tag"
      }
      if(commenting){
        label = "Comment Button"
        unsetCommentBuffer()
      }
      let action = "Register Step " + step
      ReactGA.event({
        category: 'Activation',
        action: action,
        label: label
      });
    }
    event.preventDefault()
    this.setState({step})
    if(onChangeStep)onChangeStep(step)
  }
  render() {
    const {
      formState,
      registering,
    } = this.props

    const {
      step,
    } = this.state

    const disableStep1 = !this.props.valid && step === 1
    const disableStep2 = this.state.step === 2 && (!formState || !formState.values || !formState.values.first_name || !formState.values.last_name)

    return (
    <div>
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {step === 1 &&
          <div>
            <p style={{fontSize: '18px', textAlign: 'center', marginBottom: '2rem', marginTop: 0}}>Follow projects and tags you're interested in, stay updated, and get recommendations.</p>
            <Field name="email" component={TextField} label="Email" type="email" validate={[isEmail, required]}/>
          </div>
        }

        {step === 2 &&
          <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{marginRight: '1rem'}}>
                <Field name="first_name" component={TextField} label="First Name" type="text" validate={[required]}/>
              </div>
              <div>
                <Field name="last_name" component={TextField} label="Last Name" type="text" validate={[required]}/>
              </div>
            </div>
            <Field name="password" type="password" component={TextField} label="Password" validate={[required, minLength8]}/>
          </div>
        }

            {step === 2 &&
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button type="submit" disabled={formState && formState.syncErrors} style={{display: 'none'}} />
              <Button
                typeClass="subtle"
                onClick={event => this.changeStep(event, step - 1)}
                label="Back"/>
              <Button
                disabled={formState && formState.syncErrors}
                type="submit"
                loading={registering}
                style={{float: 'right'}}
                typeClass="action"
                label="Register"/>
            </div>
            }

            {step === 1 &&
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <div style={{fontSize: 12, width: '60%'}}>By signing up you agree to Wevolver's <a target='_blank' href="/terms">Terms</a> and <a target='_blank' href="/privacy-policy">Privacy Policy</a></div>
               <Button
                disabled={disableStep1 || disableStep2}
                typeClass="action"
                onClick={event => this.changeStep(event, step + 1)}
                label="Next"/>
              </div>
            }
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'userRegister',
})(UserRegisterForm)
