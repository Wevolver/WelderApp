import React, { Component } from 'react';
import './layout.css';

class MainContainer extends Component {
  render() {

    return (
      <div className="layout-main-container" style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default MainContainer;
