import React, { Component } from 'react';
import { connect } from 'react-redux'
import TagsComponent from '../../components/tags'
import { getTags, getCategories } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.wevolverApp.tags.loading,
    related: state.wevolverApp.tags.related,
    location: state.router.location,
    categories: state.wevolverApp.categories.active
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: (query) => dispatch(getTags(query)),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsComponent);
