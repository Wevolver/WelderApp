import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import ReactTooltip from 'react-tooltip'
import Tooltip from '../../icons/tooltip'
import './inputs.css'

const required = value => value ? undefined : 'Required'

class TextField extends Component {
  render() {
    const {
      type,
      name,
      label,
      onChange,
      input,
      value,
      hidden,
      placeholder,
      meta,
      limit,
      labelStyle,
      warning,
      minimumWidth,
      prefix,
      suffix
    } = this.props
    if (limit) input.value = input.value.slice(0,limit)
    return (
      <div style={{ display: hidden === true ? 'none' : '', minWidth: minimumWidth ? minimumWidth : 'unset', position: 'relative'}}>
      <ReactTooltip />
      {label &&
        <div className="text-input-label" style={labelStyle}>
          <div>
          {label}
          <span className="text-input-error">
           {(meta && meta.touched) && meta.error && <div>- {meta.error}</div>}
          </span>
        </div>
          {warning &&
            <span data-tip={warning}> <Tooltip/></span>
          }
        </div>
      }
      <div className="text-input-container">
      <input
        className="text-input"
        type={type}
        name={name}
        placeholder={placeholder}
        style={{
          paddingLeft: prefix ? 40 : '0.5rem',
          paddingRight: suffix ? 40 : '0.5rem'
        }}
        {...input}
      />
      {prefix &&
        <div style={{
          background: 'transparent',
          width: 40,
          height: 36,
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {prefix}
        </div>
      }
      {suffix &&
        <div style={{
          background: 'transparent',
          width: 40,
          height: 36,
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {suffix}
        </div>
      }
      {limit && <div className={input.value.length >= limit ? "text-input-length-counter error": "text-input-length-counter"}>{limit - input.value.length} / {limit}</div>}
      </div>
      </div>
    );
  }
}

export default TextField
