import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProjectSettingsModal from '../../components/modals/projectSettings'

import { editProject, deleteProject, searchMembers, getMembers, getUserWithPk } from '../../actions/index'

const mapStateToProps = state => {
  return {
    formState: state.form.projectSettings,
    loading: state.wevolverApp.project.loading,
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    members: state.wevolverApp.project.members,
    memberSearchResults: state.wevolverApp.project.memberSearch,
    plan: state.wevolverApp.auth.plan,
    authUser: state.wevolverApp.auth,
    hiddenTags: state.wevolverApp.tags.hiddenOptions,
    users: state.wevolverApp.user
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  editProject: (data) => dispatch(editProject(data)),
  deleteProject: () => dispatch(deleteProject()),
  onSearchMembers: (query) => dispatch(searchMembers(query)),
  getMembers: (project) => dispatch(getMembers(project)),
  getUserWithPk: (pk) => dispatch(getUserWithPk(pk)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectSettingsModal)
