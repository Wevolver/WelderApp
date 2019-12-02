import React, { Component } from 'react';
import { connect } from 'react-redux'
import { search } from '../../actions/index'
import HomeComponent from '../../components/layout/home'
import auth from '../../modules/auth.js'

import {
  setModalId,
} from '../../actions'

const mapStateToProps = ( { wevolverApp }) => {
  return {
    projects: wevolverApp.search.home || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: () => dispatch(search('home', 'first', 'staff pick', 3)),
    // openRegisterModal: () => auth.login()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent)
