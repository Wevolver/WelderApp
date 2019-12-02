import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProjectHistoryModal from '../../components/modals/projectHistory'
import {
  invalidateTree,
  setModalId,
  getProjectHistory } from '../../actions/index'

const mapStateToProps = state => {
  return {
    commitHistory: state.wevolverApp.project[state.wevolverApp.project.selected]['history/master'] || null,
    selectedProject: state.wevolverApp.project.selected,
    location: state.wevolverApp.location,
    fetchingHistory: state.wevolverApp.project.fetchingHistory
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  getProjectHistory: (page) => dispatch(getProjectHistory('master', page)),
  invalidateTree: () => dispatch(invalidateTree()),
  closeModal: (index) => dispatch(setModalId(null)),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectHistoryModal)
