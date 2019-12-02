import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserProjects, setModalId } from '../../actions/index'
import ProjectList from '../../components/layout/profile/projectList'

const mapStateToProps = (state, ownProps) => {
  const {
    match,
  } = ownProps
  return {
    auth: state.wevolverApp.auth,
    user: state.wevolverApp.user,
    projects: state.wevolverApp.profile.projects,
    isAuthenticated: state.wevolverApp.auth.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  getUserProjects: (userSlug, limit) => dispatch(getUserProjects(userSlug, limit)),
  openModal: (index) => dispatch(setModalId(index)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList)
