import React, { Component } from 'react';

import Modal from './modal'
import Subnavbar from '../../navbar/subNavbar'
import TextField from '../../elements/inputs/textField'
import Button from '../../elements/button'
import { CSSTransition } from 'react-transition-group'
// import Text from '../elements/inputs/text'
import './modal.css'

const required = value => value ? undefined : 'Required'

class Fade extends Component {

  render() {
    return (
      <CSSTransition
          classNames="modal"
          in={this.props.in}
          timeout={200}>
        {this.props.children}
      </CSSTransition>
    );
  }
}

export default Fade