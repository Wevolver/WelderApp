import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  noAuthFollowTag,
  followTag,
  setModalId
} from '../../actions/index'
import auth from '../../modules/auth.js'
import FollowTagButtonComponent from '../../components/followTagButton'

const mapStateToProps = state => {
  return {
    tagsFollowed: (state.wevolverApp.auth.tags_followed && state.wevolverApp.auth.tags_followed.map(tag => (tag.name))) || null,
    isAuthenticated: state.wevolverApp.auth.isAuthenticated,
    isRunning: state.wevolverApp.auth.isRunning,
    tagFollowBuffer: state.wevolverApp.auth.tags_followed_buffer,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
    followTag: (tagId, unfollow) => dispatch(followTag(tagId, unfollow)),
    noAuthFollowTag: (tagId, unfollow) => dispatch(noAuthFollowTag(tagId, unfollow)),
    openLoginModal: () => auth.login(),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowTagButtonComponent)
