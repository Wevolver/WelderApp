import React, { Component } from 'react';
import { connect } from 'react-redux'
import NavbarComponent from '../../components/navbar'

import {
  setModalId,
  logOut,
  getAuthUser
} from '../../actions'

const mapStateToProps = ( { wevolverApp }) => {
  return {
    auth: wevolverApp.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    getAuthUser: (profile, token) => dispatch(getAuthUser(profile, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarComponent)

