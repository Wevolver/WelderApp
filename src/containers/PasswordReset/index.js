import React, { Component } from 'react';
import { connect } from 'react-redux'

import PasswordResetComponent from '../../components/layout/passwordReset'
import { newPassword } from '../../actions/index'

const mapStateToProps = ( { form }) => {
  return {
    formState: form.passwordReset,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newPassword: (data) => dispatch(newPassword(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordResetComponent)

