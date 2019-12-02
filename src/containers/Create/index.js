import React, { Component } from 'react';
import { connect } from 'react-redux'

import CreateComponent from '../../components/layout/create'
// import { getDesktopParams } from '../../actions/index'



const mapStateToProps = ( { wevolverApp }) => {
  return {
    auth: wevolverApp.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateComponent)
