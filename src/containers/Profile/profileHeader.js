import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getUser } from '../../actions/index'
import ProfileHeader from '../../components/layout/profile/profileHeader'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.wevolverApp.user[state.wevolverApp.user.selected],
    auth: state.wevolverApp.auth,
    profile: state.wevolverApp.profile[state.wevolverApp.profile.selected]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userSlug) => { dispatch(getUser(userSlug)) },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileHeader);
