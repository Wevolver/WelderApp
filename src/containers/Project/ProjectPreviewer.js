import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  fileHistoryToggle,
  downloadFile,
  deleteFile,
  editFileToggle, } from '../../actions/index'

import ProjectPreviewerCompnonent from '../../components/layout/project/projectPreviewer'

const mapStateToProps = state => {
  return {
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    editing: state.wevolverApp.files.editing,
    location: state.wevolverApp.location,
    historyView: state.wevolverApp.files.historyView,
    treeLoaded: state.wevolverApp.tree.loaded,
    isTreeVisible: state.wevolverApp.tree.isVisible,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
    deleteFile: () => dispatch(deleteFile()),
    downloadFile: () => dispatch(downloadFile()),
    fileHistoryToggle: (toggle) => dispatch(fileHistoryToggle(toggle)),
    editFileToggle: () => dispatch(editFileToggle(true)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectPreviewerCompnonent)
