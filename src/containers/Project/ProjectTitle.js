import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  setModalId,
} from '../../actions/index'

import ProjectTitleCompnonent from '../../components/layout/project/projectTitle'

const mapStateToProps = state => {
  return {
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    user: state.wevolverApp.user,
    location: state.wevolverApp.location,
    auth: state.wevolverApp.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
   openModal: (index) => dispatch(setModalId(index)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectTitleCompnonent)
