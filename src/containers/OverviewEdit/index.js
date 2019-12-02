import React, { Component } from 'react';
import { connect } from 'react-redux'

import OverviewEditComponent from '../../components/overviewEdit'
import { editOverview, redirect } from '../../actions/index'

const mapStateToProps = ( { form }) => {
  return {
    formState: form.projectOverview,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editOverview: (projectId) => dispatch(editOverview(projectId)),
    redirect: (route) => { dispatch(redirect(route)) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OverviewEditComponent)
