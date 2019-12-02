import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserProfile } from '../../actions/index'

import ProfileUserDetails from '../../components/layout/profile/profileUserDetails'

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.wevolverApp.auth,
    profile: state.wevolverApp.profile[state.wevolverApp.profile.selected],
    user: state.wevolverApp.user[state.wevolverApp.user.selected],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (userSlug) => { dispatch(getUserProfile(userSlug)) },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileUserDetails);
