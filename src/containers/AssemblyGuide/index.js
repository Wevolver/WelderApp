import React, { Component } from 'react';
import { connect } from 'react-redux'

import AssemblyGuideComponent from '../../components/assemblyGuide'

import {
  setModalId,
  addEditingGuide,
  removeEditingGuide,
  uploadGuide,
 } from '../../actions/index'

const mapStateToProps = ( { wevolverApp }) => {
  const fileName = wevolverApp.location.folderPath.split('/').pop()
  return {
    isAuthenticated: wevolverApp.auth.isAuthenticated,
    project: wevolverApp.project[wevolverApp.project.selected],
    fileName,
    location: wevolverApp.location,
    auth: wevolverApp.auth,
    guide: wevolverApp.guide.editing,
    tree: wevolverApp.tree,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openEditStepModal: (path) => dispatch(setModalId('editAssemblyStep', path)),
    openEditGuideModal: (path) => dispatch(setModalId('editAssemblyGuideInfo', path)),
    addEditingGuide: (json, stepIndex) => dispatch(addEditingGuide(json, stepIndex)),
    removeEditingGuide: () => dispatch(removeEditingGuide()),
    uploadGuide: (file, path, stepChange) => dispatch(uploadGuide(file, path, stepChange)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssemblyGuideComponent)
