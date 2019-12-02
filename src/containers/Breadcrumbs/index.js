import React, { Component } from 'react';
import { connect } from 'react-redux'

import BreadcrumbsComponent from '../../components/breadcrumbs'

const mapStateToProps = ( { wevolverApp }) => {
  return {
    location: wevolverApp.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BreadcrumbsComponent)

