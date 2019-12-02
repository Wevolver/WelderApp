import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
} from '../../actions/index'

import ProjectMetaCompnonent from '../../components/layout/project/projectMeta'

const mapStateToProps = state => {
  return {
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectMetaCompnonent)
