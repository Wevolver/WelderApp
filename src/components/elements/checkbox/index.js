import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import './checkbox.css'

class CheckboxField extends Component {
  render() {
    const {
      type,
      name,
      label,
      // onChange,
      input,
      value,
      hidden
    } = this.props;
    return (
      <div style={{ display: hidden === true ? 'none' : '' }} className="checkbox-input">
        <input id={input.name} type={type} {...input}/>

        <label htmlFor={input.name}><div className="checkbox">{label}</div></label>
      </div>
    );
  }
}

export default CheckboxField

