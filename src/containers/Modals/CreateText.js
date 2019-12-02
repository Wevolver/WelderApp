import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateTextModal from '../../components/modals/createText'
import { createText } from '../../actions/index'

const mapStateToProps = state => {
  return {
    formState: state.form.createTextFiles
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  createText: (modalPath) => dispatch(createText(modalPath))
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTextModal)
