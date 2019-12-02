import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  getProjectTree,
  invalidateTree,
  redirect,
  addTreeListOfFiles,
  selectTreeItem,
  removeEditingGuide,
  setModalId } from '../../actions/index'
import TreeComponent from '../../components/tree/treeFixedTrigger'

const mapStateToProps = (state) => {
  const location = state.wevolverApp.location
  return {
    tree: state.wevolverApp.tree,
    location,
    uploadingGuide: state.wevolverApp.guide.uploadingGuide,
    project: state.wevolverApp.project[state.wevolverApp.project.selected]
  }
}


const mapDispatchToProps = (dispatch) => {
 return {
  redirect: (link) => dispatch(redirect(link)),
  getProjectTree: (projectsUrl) => dispatch(getProjectTree(projectsUrl)),
  invalidateTree: () => dispatch(invalidateTree()),
  removeEditingGuide: () => dispatch(removeEditingGuide()),
  onFileList: (list) => dispatch(addTreeListOfFiles(list)),
  openModal: (index, path, tree) => dispatch(setModalId(index, path, tree)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TreeComponent)
