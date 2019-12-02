import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  getRelatedProjects, } from '../../actions/index'

import RelatedProjectsCompnonent from '../../components/layout/project/relatedProjects'

const mapStateToProps = state => {
  return {
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
    related: state.wevolverApp.project.related[state.wevolverApp.project.selected],
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  getRelatedProjects: (tags, name) => {dispatch(getRelatedProjects(tags, name))},
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelatedProjectsCompnonent)
