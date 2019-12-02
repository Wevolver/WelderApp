import React, { Component } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import './dropdown.css'

class DropdownMenu extends Component {
  hide = () => {
    this.refs.dropdown.hide()
  }
  
  render() {
    const {
      label,
      disabled,
      navbar,
      files
    } = this.props

    let dropDownClass = ""
    if(navbar){
      dropDownClass = "navbar-dropdown"
    }
    if(files){
      dropDownClass = "files-dropdown"
    }


    return (
      <Dropdown ref="dropdown" disabled={disabled} className={dropDownClass}>
        <DropdownTrigger>{label}</DropdownTrigger>
        <DropdownContent>
          {this.props.children}
        </DropdownContent>
      </Dropdown>
    )
  }
};

export default DropdownMenu;
