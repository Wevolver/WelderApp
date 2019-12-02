import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash/get'
import {
  setModalId,
  followUser,
  unfollowUser,
  followUserBuffer
} from '../../actions/index'
import auth from '../../modules/auth.js'
import FollowUserButtonComponent from '../../components/followUserButton'

const mapStateToProps = (state, ownProps) => {
  const userSlug = get(ownProps, 'user.slug')
  let profile = {}
  if(userSlug) profile = state.wevolverApp.profile[userSlug] || {}
  const followers = get(profile, 'followers') || []
  const auth = state.wevolverApp.auth
  let isFollowing = false

  followers.forEach(follower => isFollowing = follower ? follower.$oid === auth._id : false)
  return {
    auth,
    isRunning: state.wevolverApp.auth.isRunning,
    isFollowing,
    profile,
    followersCount: followers.length,
    userFollowBuffer: state.wevolverApp.user.userFollowBuffer,
    isOwnProfile: profile._id === auth._id
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
    openLoginModal: () => auth.login(),
    followUser: (user) => dispatch(followUser(user)),
    unfollowUser: (user) => dispatch(unfollowUser(user)),
    followUserBuffer: (user) => dispatch(followUserBuffer(user)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowUserButtonComponent)
