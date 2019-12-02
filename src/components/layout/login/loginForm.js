import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from '../../elements/inputs/textField'
import Button from '../../elements/button'

const required = value => value ? undefined : 'Required'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      reset: false,
    }
  }

  onSubmit = (data) => {
    const { 
      login,
      resetPassword,
    } = this.props
    if(this.state.reset) {
      resetPassword()
    } else {
      login(data)
    }
    this.setState({loading: true})
  }

  onBack = (event) => {
    event.preventDefault()
    this.setState({
      reset: false
    })
  }


  render() {
    const {
      handleSubmit,
      formState,
      isRunning,
    } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="email" component={TextField} label="Email" type="email" validate={required}/>
        {!this.state.reset &&
          <Field
            name="password"
            component={TextField}
            label="Password"
            type="password"
          />
        }
        {!this.state.reset &&
            <a
            style={{cursor: 'pointer', fontSize: 14}}
            onClick={() => this.setState({ reset: true })}
          >
            Lost your password?
          </a>
        }
        <div className="modal-buttons">
          {this.state.reset && 
            <Button 
              label="Back"
              onClick={this.onBack}
            />
          }
          <Button 
            disabled={formState && formState.syncErrors && !this.state.reset}
            loading={isRunning}
            typeClass="action"
            type="submit"
            label={this.state.reset ? 'Reset Password' : 'Log In'}
          />
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm)
