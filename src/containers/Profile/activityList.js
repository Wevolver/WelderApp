import React, { Component } from 'react';
import { connect } from 'react-redux'
import ActivityList from '../../components/layout/profile/activityList'
import { getUsersComments } from '../../actions/index'


const mapStateToProps = (state, ownProps) => {
  const {
    match,
  } = ownProps
  return {
    activityPages: state.wevolverApp.profile.activityPages,
    activity: state.wevolverApp.profile.activity,
    user: state.wevolverApp.user[state.wevolverApp.user.selected],
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getUsersComments: (skip, selectedUser) => { dispatch(getUsersComments(skip, selectedUser)) }
   }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivityList)
