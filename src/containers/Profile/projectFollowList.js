import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getFollowedProjects, getUserProjects } from '../../actions/index'

import ProjectFollowList from '../../components/layout/profile/projectFollowList'

const mapStateToProps = (state, ownProps) => {
  const {
    userSlug,
  } = ownProps
  return {
    user: state.wevolverApp.user[userSlug],
    followed: state.wevolverApp.profile.followed,
    isAuthenticated: state.wevolverApp.auth.isAuthenticated,
    auth: state.wevolverApp.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
    getUserProjects: (userSlug) => dispatch(getUserProjects(userSlug)),
    getFollowedProjects:  (limit, userSlug) => dispatch(getFollowedProjects(limit, userSlug))
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFollowList)
