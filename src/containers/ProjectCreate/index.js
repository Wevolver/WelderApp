import React, { Component } from 'react';
import { connect } from 'react-redux'

import CreateComponent from '../../components/layout/projectCreate'
import {
  getTagOptions,
  wizardCreateProject } from '../../actions/index'



const mapStateToProps = ( { wevolverApp, router, form }) => {
  return {
    auth: wevolverApp.auth,
    options: wevolverApp.tags.options,
    formState: form.Wizard,
    creating: wevolverApp.project.creating,
    wizardProjectCreated: wevolverApp.project.wizardProjectCreated,
    project: wevolverApp.project[wevolverApp.project.selected],
    location: router.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (data, careables) => dispatch(wizardCreateProject(data, careables)),
    getTagOptions: () => dispatch(getTagOptions()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateComponent)
