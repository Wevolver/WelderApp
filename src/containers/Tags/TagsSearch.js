import React, { Component } from 'react';
import { connect } from 'react-redux'
import TagsSelectComponent from '../../components/tags/tagsSearch'
import {
  getTagSearch } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    options: state.wevolverApp.tags.options,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTagOptions: () => dispatch(getTagSearch()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsSelectComponent);
