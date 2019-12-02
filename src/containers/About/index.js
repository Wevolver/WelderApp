import React, { Component } from 'react';
import { connect } from 'react-redux'

import AboutComponent from '../../components/layout/about'

import {
} from '../../actions'

const mapStateToProps = ( { wevolverApp }) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutComponent)

