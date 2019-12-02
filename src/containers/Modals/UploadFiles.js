import React, { Component } from 'react'
import { connect } from 'react-redux'

import UploadFilesModal from '../../components/modals/uploadFiles'

import { uploadFiles } from '../../actions/index'

const mapStateToProps = state => {
  return {
    formState: state.form.uploadFiles,
    defaultMessage: "Uploaded files."
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  uploadFiles: (modalPath) => dispatch(uploadFiles(modalPath))
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadFilesModal)
