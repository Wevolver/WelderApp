import React, { Component } from 'react'
import { connect } from 'react-redux'
import { blur } from 'redux-form/immutable';

import CreateProjectModal from '../../components/modals/createProject'

import { createProject } from '../../actions/index'

const mapStateToProps = state => {
  return {
    formState: state.form.createProject,
    creating: state.wevolverApp.project.creating,
    plan: state.wevolverApp.auth.plan
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    blur,
    createProject: (data) => dispatch(createProject(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProjectModal)
