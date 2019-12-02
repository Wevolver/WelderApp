import React, { Component } from 'react';
import { connect } from 'react-redux'

import RegisterComponent from '../../components/layout/register'
import { registerUser } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    formState: state.form.userRegister,
    registering: state.wevolverApp.user.registering,
    auth: state.wevolverApp.auth,
    source: ownProps.match.path === '/join' ? 'follow' : 'register',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: () => dispatch(registerUser()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterComponent)
