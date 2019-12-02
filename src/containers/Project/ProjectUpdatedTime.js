import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  getProjectHistory, } from '../../actions/index'

import ProjectUpdatedTimeCompnonent from '../../components/layout/project/projectUpdatedTime'

const mapStateToProps = state => {
  return {
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    lastCommitTime: state.wevolverApp.tree.lastCommitTime || null
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  // getProjectHistory: () => dispatch(getProjectHistory('master', 0, 1)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectUpdatedTimeCompnonent)