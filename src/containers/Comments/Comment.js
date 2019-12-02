import React, { Component } from 'react';
import { connect } from 'react-redux'
import CommentComponent from '../../components/comments/comment'
import { getUserWithPk } from '../../actions/index'
import get from 'lodash/get'

const mapStateToProps = (state, ownProps) => {
  const author_id = get(ownProps.comment, 'author_id.$oid') || ownProps.comment.author

  return {
    user: state.wevolverApp.user[author_id],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserWithPk: (pk) => dispatch(getUserWithPk(pk))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentComponent);
