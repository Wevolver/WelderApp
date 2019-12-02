import React, { Component } from 'react'
import TextField from '../elements/inputs/textField'
import { Field } from 'redux-form'
import Button from '../elements/button'
import TrashIcon from '../icons/trash'


const RenderSpecRow = ({ index, row, onRemove }) => (
  <div key={index} className='specs-row'>
    <div className="specs-cell">
    
    <Field
      name={`${row}.name`}
      onDrop={e => { e.preventDefault(); }}
      type="text"
      limit={50}
      // label={index < 1 ? 'Name' : null}
      component={TextField}/>
    </div>
      <div style={{width: 8, flexShrink: 0}} />
    <div className="specs-cell">
      <Field
        name={`${row}.value`}
        type="text"
        onDrop={e => { e.preventDefault(); }}
        limit={50}
        component={TextField}/>
    </div>
    <div style={{width: 8, flexShrink: 0}} />
    <div className="specs-cell">
    <Field
      name={`${row}.units`}
      type="text"
      onDrop={e => { e.preventDefault(); }}
      limit={50}
      // label={index < 1 ? 'Units' : null}
      component={TextField}/>
      <div style={{width: 8, flexShrink: 0}} />
    </div>
    <div style={{width: 8, flexShrink: 0}} />
    <Button
    // disabled={formState && formState.syncErrors}
      typeClass=""
      // loading={auth.updating}
      style={{marginTop: 10, marginLeft: 0, flexShrink: 0}}
      type="button"
      icon={<TrashIcon />}
      square
      fill="#484848"
      onClick={onRemove}
    />
  </div>
)

export default RenderSpecRow