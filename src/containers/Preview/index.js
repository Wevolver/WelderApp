import { connect } from 'react-redux'

import PreviewComponent from '../../components/preview'
import { previewerFileTypes } from '../../constants/previewerFileTypes'
import get from 'lodash/get'

import {
  getProjectFile,
  setModalId,
  editFile,
  editFileToggle } from '../../actions/index'

function isPreviewableExt(ext) {
  for(let mainType in previewerFileTypes) {
    if(previewerFileTypes[mainType].indexOf(ext) > -1) {
      return true
    }
  }
  return false
}

const mapStateToProps = ({ wevolverApp }, ownProps) => {
  const params = get(ownProps, 'match.params') || {}
  const files = wevolverApp.files[`${params.userSlug}:${params.projectSlug}:${params.folderPath}`]

  return {
    isRunning: wevolverApp.files.isRunning,
    file: files ? files[wevolverApp.files.selected] : null,
    selectedFile: wevolverApp.files.selected,
    selectedProject: wevolverApp.project.selected,
    projectName: wevolverApp.project[wevolverApp.project.selected].name,
    location: wevolverApp.location,
    editing: wevolverApp.files.editing,
    isPreviewable: wevolverApp.location.fileExtension.type ? isPreviewableExt(wevolverApp.location.fileExtension.type.toLowerCase()) : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProjectFile: (path, oid) => dispatch(getProjectFile(path, oid)),
    openModal: (index) => dispatch(setModalId(index)),
    editFile: (markdown) => dispatch(editFile(markdown)),
    editFileToggle: (value) => dispatch(editFileToggle(value))
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreviewComponent)