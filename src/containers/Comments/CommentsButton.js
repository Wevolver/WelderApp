import React, { Component } from 'react';
import { connect } from 'react-redux'
import CommentsButtonComponent from '../../components/comments/commentsButton'
import {
 } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  const project = state.wevolverApp.project[state.wevolverApp.project.selected]
  const comments = project ? (state.wevolverApp.comments[project._id.$oid] || null) : null
  let commentsCount = null
  if(comments) {
    commentsCount = 0
    Object.keys(comments).forEach(key => {
      commentsCount += comments[key].length
    })
  }
  return {
    commentsCount,
    commentsEnabled: project ? project.comments_enabled : false,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsButtonComponent);
