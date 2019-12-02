import React, { Component } from 'react';
import { connect } from 'react-redux'
import CommentsComponent from '../../components/comments'
import get from 'lodash/get'
import auth from '../../modules/auth.js'


import {
  submitComment,
  setModalId,
  getComments,
  setCommentBuffer
 } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  const selected = get(state.wevolverApp, 'project.selected')
  const project = state.wevolverApp.project[selected] || {}
  return {
    project,
    users: state.wevolverApp.user,
    comments: state.wevolverApp.comments[get(project, '_id.$oid')] || [],
    commentsEnabled: get(project, 'comments_enabled'),
    auth: state.wevolverApp.auth,
    commentBuffer: state.wevolverApp.project.commentBuffer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitComment: (comment) => dispatch(submitComment(comment)),
    openModal:  () => auth.login(),
    getComments: (projectId) => dispatch(getComments(projectId)),
    setCommentBuffer: () => dispatch(setCommentBuffer())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsComponent);
