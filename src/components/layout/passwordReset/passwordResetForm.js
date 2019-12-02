import React, { Component } from 'react';
import { Field, reduxForm, isDirty } from 'redux-form'
import { connect } from 'react-redux'

import TextField from '../../elements/inputs/textField'
import Button from '../../elements/button'
import CheckboxField from '../../elements/checkbox'

const required = value => value ? undefined : 'Required'
const isEmail = value => console.log(value)
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength8 = minLength(8)

const validate = values => {
  const errors = {}
  if (values.new_password !== values.confirm_password) {
    errors.confirm_password = 'Confirmation does not match password'
  }
  return errors
}

class PasswordResetForm extends Component {

  onSubmit = (data) => {
    const {
      onSubmit
    } = this.props

    onSubmit()
  }


  render() {
    const {
      formState,
      registering
    } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="new_password" component={TextField} label="New Password" type="password" validate={[required, minLength8]} />
          <Field name="confirm_password" component={TextField} label="Confirm Password" type="password" validate={[required, minLength8]} />
          <Button
            disabled={formState && formState.syncErrors}
            type="submit"
            loading={registering}
            style={{float: 'right'}}
            typeClass="action"
            label="Reset Password"/>
          </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'passwordReset',
  validate
})(PasswordResetForm)
