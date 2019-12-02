import React, { Component } from 'react';
import { connect } from 'react-redux'

import FeaturesComponent from '../../components/layout/features'

import {} from '../../actions'

const mapStateToProps = ( { wevolverApp }) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeaturesComponent)
