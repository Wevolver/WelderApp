import React, { Component } from 'react';
import './inputs.css'

export default class TextArea extends Component {
  componentDidMount() {
    if(this.props.autofocus)this._input.focus();
  }

  render() {
    const {
      type,
      name,
      label,
      input,
      value,
      placeholder,
      meta,
      limit,
      rows,
      labelStyle
    } = this.props;
    if (limit) input.value = input.value.slice(0,limit)
    return (
      <div>
      {label &&
        <div className="text-input-label" style={labelStyle}>
          {label}
          <span className="text-input-error">
           {(meta && meta.touched) && meta.error && <div>- {meta.error}</div>}
          </span>
        </div>
      }
      <div className="text-input-container">
      <textarea
        style={{marginBottom: -6}}
        className="text-input"
        rows={rows || 4}
        type={type}
        name={name}
        placeholder={placeholder}
        {...input}
        ref={c => (this._input = c)}
      />
      {limit && <div className={input.value.length >= limit ? "text-input-length-counter error": "text-input-length-counter"}>{limit - input.value.length} / {limit}</div>}
      </div>
      </div>
    );
  }
}
