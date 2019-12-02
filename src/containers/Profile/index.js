import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getUser, setModalId, changeProfileTab } from '../../actions/index'
import ProfileComponent from '../../components/layout/profile'

const mapStateToProps = (state, ownProps) => {
  const {
    match
  } = ownProps
  return {
    auth: state.wevolverApp.auth,
    user: state.wevolverApp.user[match.params.userSlug],
    numberOfProjects: state.wevolverApp.profile.projects.results.length,
    selectedTab: state.wevolverApp.profile.selectedTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userSlug) => { dispatch(getUser(userSlug)) },
    openModal: (index) => dispatch(setModalId(index)),
    changeProfileTab: (tab) => dispatch(changeProfileTab(tab)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);
