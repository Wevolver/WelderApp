import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  getFileHistory,
  getProjectFile } from '../../actions/index'

import FileHistoryComponent from '../../components/history/fileHistory'

const mapStateToProps = state => {
  const file = state.wevolverApp.files[`${state.wevolverApp.location.folderPath}`]
  return {
    selected: state.wevolverApp.files.selected,
    fileHistory: file ? file.history : null,
    selectedProject: state.wevolverApp.project.selected,
    location: state.wevolverApp.location
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
    getFileHistory: () => dispatch(getFileHistory()),

 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileHistoryComponent)
