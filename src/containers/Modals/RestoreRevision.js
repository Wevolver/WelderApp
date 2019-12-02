import React, { Component } from 'react'
import { connect } from 'react-redux'

import { forkProject, revertCommit } from '../../actions/index'
import RestoreRevisionModal from '../../components/modals/restoreRevision'

const mapStateToProps = state => {
  return {
    loading: state.wevolverApp.project.loading,
    location: state.wevolverApp.location,
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    auth: state.wevolverApp.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  revertCommit: (commit) => { dispatch(revertCommit(commit)) },
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestoreRevisionModal)
