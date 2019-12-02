import React, { Component } from 'react';
import { connect } from 'react-redux'
import SearchPageComponent from '../../components/searchPage'
import { search } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  const {
    page
  } = ownProps

  return {
    pageResults: state.wevolverApp.search[page]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (page, next, tags, limit, hiddenTags) => dispatch(search(page, next, tags, limit, hiddenTags))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPageComponent);
