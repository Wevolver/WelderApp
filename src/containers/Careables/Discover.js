import React, { Component } from 'react';
import { connect } from 'react-redux'

import { search } from '../../actions/index'
import CareablesDiscoverComponent from '../../components/careables/discover'

import {
} from '../../actions'

const mapStateToProps = ( { wevolverApp }) => {
  return {
    results: wevolverApp.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (name, next, tag, limit, hiddenTags) => {
      console.log(name, next, tag, limit, hiddenTags);
      dispatch(search(name, next, tag, limit, hiddenTags))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CareablesDiscoverComponent)
