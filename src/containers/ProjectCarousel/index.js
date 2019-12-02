import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProjectCarousel from '../../components/projectCarousel'

import { search } from '../../actions'

const mapStateToProps = ( { wevolverApp }, ownProps) => {
  return {
    projects: wevolverApp.search[ownProps.load.name] || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (name, tag, limit, hiddenTags) => dispatch(search(name, 'first', tag, limit, hiddenTags)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectCarousel)
