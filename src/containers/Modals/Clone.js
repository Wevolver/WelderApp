import React, { Component } from 'react'
import { connect } from 'react-redux'

import { forkProject } from '../../actions/index'
import CloneModal from '../../components/modals/clone'

const mapStateToProps = state => {
  return {
    loading: state.wevolverApp.project.loading,
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    auth: state.wevolverApp.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
    forkProject: (data) => dispatch(forkProject(data)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CloneModal)
