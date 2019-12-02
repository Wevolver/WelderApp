import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import './radio.css'

class RadioField extends Component {
  render() {
    const {
      type,
      name,
      label,
      disabled,
      subLabel,
      input,
      value
    } = this.props;
    return (
      <div className="radio-input">
        <input disabled={disabled} id={label} type={type} {...input}/>
        {disabled &&
          <label htmlFor={label}><div className="radio disabled-radio"><b>{label}</b><div className="disabled-radio">
            With a free account you can only create public projects. Contact us at info@welder.app to request private projects.
            </div></div></label>}
        {!disabled && <label htmlFor={label}><div className="radio"><b>{label}</b><div>{subLabel}</div></div></label>}
      </div>
    );
  }
}

export default RadioField
