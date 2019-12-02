import React, { Component } from 'react';
import { connect } from 'react-redux'

import CareablesComponent from '../../components/careables'
import {
  getTagOptions,
  wizardCreateProject } from '../../actions/index'



const mapStateToProps = ( { wevolverApp, form }) => {
  return {
    auth: wevolverApp.auth,
    options: wevolverApp.tags.options,
    formState: form.wizard,
    creating: wevolverApp.project.creating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (data) => dispatch(wizardCreateProject(data)),
    getTagOptions: () => dispatch(getTagOptions()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CareablesComponent)
