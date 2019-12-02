import React, { Component } from 'react';
import { connect } from 'react-redux'

import DesktopComponent from '../../components/layout/desktop'
import { getDesktopParams } from '../../actions/index'



const mapStateToProps = ( { wevolverApp }) => {
  return {
    desktop: wevolverApp.desktop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDesktopParams: () => dispatch(getDesktopParams())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DesktopComponent)
