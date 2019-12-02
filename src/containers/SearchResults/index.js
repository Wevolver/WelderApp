import React from 'react';
import { connect } from 'react-redux'
import SearchResults from '../../components/layout/searchResults'
import {
   onSiteSearch  } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    siteSearchResults: state.wevolverApp.search.siteSearchResults,
    siteSearchQueryLoading: state.wevolverApp.search.siteSearchQueryLoading,
    siteSearchQueryNoResults: state.wevolverApp.search.siteSearchQueryNoResults,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSiteSearchChange: (query) => dispatch(onSiteSearch(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
