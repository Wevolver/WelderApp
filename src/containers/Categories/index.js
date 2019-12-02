import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoriesComponent from '../../components/categories'
import { getCategories } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.wevolverApp.categories.loading,
    categories: state.wevolverApp.categories.active
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesComponent);
