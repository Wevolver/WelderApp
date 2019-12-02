import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getFollowedProjects } from '../../actions/index'

import FollowList from '../../components/layout/profile/tagFollowList'

const mapStateToProps = (state, ownProps) => {
  const {
    match,
  } = ownProps
  return {
    user: state.wevolverApp.user,
    followed: state.wevolverApp.auth.tags_followed,
    isAuthenticated: state.wevolverApp.auth.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
    getFollowedProjects:  () => dispatch(getFollowedProjects())
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowList)
