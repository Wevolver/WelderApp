import React, { Component } from 'react';
import { connect } from 'react-redux'

import { editAuthUser, getUserProfile, getUser } from '../../actions/index'
import UserSettingsComponent from '../../components/layout/userSettings'

const mapStateToProps = (state, ownProps) => {
  const {
    match
  } = ownProps
  console.log(state.wevolverApp.auth['profile']);
  return {
    formState: state.form.userSettings,
    auth: state.wevolverApp.auth,
    user: state.wevolverApp.user[match.params.userSlug],
    profile: state.wevolverApp.profile[match.params.userSlug],
    oldProfile: state.wevolverApp.auth['profile'],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userSlug) => { dispatch(getUser(userSlug)) },
    getUserProfile: (userSlug) => { dispatch(getUserProfile(userSlug)) },
    editAuthUser: (userId, userObject) => {
      dispatch(editAuthUser(userId, userObject)) },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSettingsComponent);
