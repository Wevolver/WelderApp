import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  setModalId,
  followProject,
  projectFollowRequest,
  unfollowProject,
  projectUnfollowRequest,
} from '../../actions/index'
import auth from '../../modules/auth.js'


import BookmarkButtonComponent from '../../components/bookmarkButton'

const mapStateToProps = state => {
  return {
    auth: state.wevolverApp.auth,
    followBuffer: state.wevolverApp.project.followBuffer,
    unfollowBuffer: state.wevolverApp.project.unfollowBuffer,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  openModal: () => auth.login(),
  followProject: (projectOid, bookmarkLocation) => { dispatch(followProject(projectOid, bookmarkLocation))},
  unfollowProject: (projectOid, bookmarkLocation) => {dispatch(unfollowProject(projectOid, bookmarkLocation))},
  projectFollowRequest: (projectOid) => {dispatch(projectFollowRequest(projectOid))},
  projectUnfollowRequest: (projectOid) => {dispatch(projectUnfollowRequest(projectOid))},
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookmarkButtonComponent)
