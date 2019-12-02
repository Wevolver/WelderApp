import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  fileHistoryToggle,
  downloadFile,
  deleteFile, } from '../../actions/index'

import ProjectFooterCompnonent from '../../components/layout/project/projectFooter'

const mapStateToProps = state => {
  return {
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    auth: state.wevolverApp.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFooterCompnonent)
