import React, { Component } from 'react';
import { connect } from 'react-redux'

import { search, getCategories } from '../../actions/index'
import DiscoverComponent from '../../components/layout/discover'

import {
} from '../../actions'

const mapStateToProps = ( { wevolverApp }) => {
  return {
    results: wevolverApp.search,
    categories: wevolverApp.categories.active,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: () => dispatch(search()),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscoverComponent)
