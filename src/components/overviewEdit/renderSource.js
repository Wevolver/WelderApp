import React, { Component } from 'react'
import TextField from '../elements/inputs/textField'
import TextArea from '../elements/inputs/textArea'
import { Field } from 'redux-form'
import Button from '../elements/button'
import TrashIcon from '../icons/trash'
import EditIcon from '../icons/pencil'
import CheckmarkIcon from '../icons/checkmark'

const RenderSource = ({ index, row, onRemove, editing, onEditChange, values }) => (
  <div key={index} className='sources-row'>
    {editing && <div style={{flexGrow: 1}}>
      <div className='sources-inner-row'>

        <div className="sources-cell">
        <Field
          name={`${row}.title`}
          onDrop={e => { e.preventDefault(); }}
          type="text"
          limit={200}
          component={TextField}
          label="Title"/>
        </div>
        <div style={{width: 8, flexShrink: 0}} />
        <div className="sources-cell">
        <Field
          name={`${row}.link`}
          onDrop={e => { e.preventDefault(); }}
          type="text"
          limit={200}
          component={TextField}
          label="Link"/>
        </div>
      </div>
      <div>
        <Field
          name={`${row}.summary`}
          type="text"
          onDrop={e => { e.preventDefault(); }}
          rows={2}
          limit={300}
          component={TextArea}
          label="Description"/>
        <Field
          name={`${row}.authors`}
          type="text"
          onDrop={e => { e.preventDefault(); }}
          rows={2}
          limit={200}
          component={TextArea}
          label="Author(s) or name of external website"/>
      </div>
    </div>}
    {!editing &&
      <div style={{flexGrow: 1}}>
        <div className="overviewV4-source">
          <div><a href={values.link} target="_blank">{values.title}</a></div>
          <p className="summary">{values.summary}</p>
          <div className="authors">{values.authors}</div>
        </div>
      </div>
    }
    <div style={{width: 8, flexShrink: 0}} />
    <div>
      {editing && <Button
      // disabled={formState && formState.syncErrors}
        typeClass=""
        // loading={auth.updating}
        style={{marginTop: 30, marginLeft: 0}}
        type="button"
        icon={<CheckmarkIcon />}
        square
        fill="#484848"
        onClick={(e) => {
          e.preventDefault()
          onEditChange(false)}
        }
      />}
      {!editing && <Button
      // disabled={formState && formState.syncErrors}
        typeClass=""
        // loading={auth.updating}
        style={{marginTop: 30, marginLeft: 0}}
        type="button"
        icon={<EditIcon />}
        square
        fill="#484848"
        onClick={(e) => onEditChange(true, e)}
      />}
      {!editing &&  <Button
      // disabled={formState && formState.syncErrors}
        typeClass=""
        // loading={auth.updating}
        style={{marginTop: 8, marginLeft: 0}}
        type="button"
        icon={<TrashIcon />}
        square
        fill="#484848"
        onClick={onRemove}
      />}
    </div>
  </div>
)

export default RenderSource
