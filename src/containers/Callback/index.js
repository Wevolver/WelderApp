import React, { Component } from 'react';
import { connect } from 'react-redux'
import CallbackComponent from '../../components/callback'

import {
  getAuthUser,
  createAuthUser,
} from '../../actions'

const mapStateToProps = ( { wevolverApp }) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthUser: (profile, token) => dispatch(getAuthUser(profile, token, true)),
    createAuthUser: (payload) => dispatch(createAuthUser(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallbackComponent)

