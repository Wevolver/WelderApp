import React, { Component } from 'react'
import { connect } from 'react-redux'

import UploadFilesModal from '../../components/modals/uploadFiles'

import { uploadFiles, editFileToggle } from '../../actions/index'

const mapStateToProps = state => {
  const fileName = state.wevolverApp.location.folderPath.split('/').pop()
  const editedFileMD = state.wevolverApp.files.edited
  return {
    editedFile: [new File([new Blob([editedFileMD], {type: 'text'})], fileName)],
    saveFile: true,
    formState: state.form.uploadFiles,
    defaultMessage: `Updated ${fileName}.`,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  uploadFiles: () => dispatch(uploadFiles()),
  editFileToggle: () => dispatch(editFileToggle())
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadFilesModal)
