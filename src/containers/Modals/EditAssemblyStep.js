import React, { Component } from 'react'
import { connect } from 'react-redux'

import EditAssemblyStepModal from '../../components/assemblyGuide/modal'
import {
  setModalId,
  uploadGuide,
  addEditingGuide
 } from '../../actions/index'


const mapStateToProps = state => {
  return {
    fileName: 'Assembly Guide.assembly',
    folders: state.wevolverApp.location.folders,
    guide: state.wevolverApp.guide.editing || {editingStepIndex: 0, steps: []},
    editingStepIndex: state.wevolverApp.guide.editingStepIndex || 0,
    listOfFiles: state.wevolverApp.guide.listOfFiles,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  closeModal: (index) => dispatch(setModalId(null)),
  uploadGuide: (file, path) => dispatch(uploadGuide(file, path)),
  addEditingGuide: (json, stepIndex) => dispatch(addEditingGuide(json, stepIndex)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAssemblyStepModal)
