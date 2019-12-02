import React, { Component } from 'react';
import { connect } from 'react-redux'
import TagsSelectComponent from '../../components/tags/tagsSelect'
import {
  addTagToProject,
  removeTagFromProject,
  getTagOptions } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    options: state.wevolverApp.tags.options,
    project: state.wevolverApp.project[state.wevolverApp.project.selected],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTagOptions: () => dispatch(getTagOptions()),
    addTagToProject: (tag, projectId) => dispatch(addTagToProject(tag, projectId)),
    removeTagFromProject: (tag, projectId) => dispatch(removeTagFromProject(tag, projectId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsSelectComponent);
