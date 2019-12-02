import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  getProjectDetail,
  setModalId,
  getUser,
  invalidateTree,
  setCurrentLocationParams,
  getProjectHistory,
  redirect,
  revertCommit,
  projectFollowRequest, } from '../../actions/index'

import ProjectComponent from '../../components/layout/project'

const mapStateToProps = state => {
  return {
    user: state.wevolverApp.user,
    auth: state.wevolverApp.auth,
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    location: state.wevolverApp.location,
    follow: state.wevolverApp.project.followBuffer,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  openModal: (index) => dispatch(setModalId(index)),
  getProjectDetail: (url, slug) => dispatch(getProjectDetail(url, slug)),
  invalidateTree: () => dispatch(invalidateTree()),
  setCurrentLocationParams: (params) => dispatch(setCurrentLocationParams(params)),
  getCommitDetails: (branch) => dispatch(getProjectHistory(branch)),
  getUser: (userSlug) => { dispatch(getUser(userSlug)) },
  redirect: (route) => { dispatch(redirect(route)) },
  revertCommit: (commit) => { dispatch(revertCommit(commit)) },
  projectFollowRequest: () => {dispatch(projectFollowRequest())},
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectComponent)
