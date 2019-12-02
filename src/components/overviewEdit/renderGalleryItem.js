import React, { Component } from 'react'
import TextField from '../elements/inputs/textField'
import TextArea from '../elements/inputs/textArea'
import { Field } from 'redux-form'
import Button from '../elements/button'
import {exctractYoutubeVideoId} from '../../modules/helpers'
import TrashIcon from '../icons/trash'

const RenderGalleryItem = ({ index, row, onRemove, values }) => (
  <div key={index} className='sources-row'>

    <Field
      name={`${row}.src`}
      onDrop={e => { e.preventDefault(); }}
      type="text"
      component={() => null}/>

    <Field
      name={`${row}.type`}
      onDrop={e => { e.preventDefault(); }}
      type="text"
      component={() => null}/>
    
    <div  style={{margin: '4px 0', marginRight: 10, display: 'flex', width: '100%'}}>
      {values.type === 'img' && 
        <div style={{backgroundImage: `url(${values.src})`, flexShrink: 0, width: 100, height: 60, backgroundSize: 'cover', backgroundPostion: 'center center'}} />
      }

      {values.type === 'youtube' &&
        <div style={{flexShrink: 0,backgroundImage: `url(https://img.youtube.com/vi/${exctractYoutubeVideoId(values.src)}/0.jpg)`, width: 100, height: 60, backgroundSize: 'cover', backgroundPostion: 'center center'}}/>
      }
      <div style={{flexGrow: 1, margin: '0 10px'}}>
        <div><b>Type:</b> {values.type === 'youtube' ? 'Youtube video' : 'Image'}</div>
        <div className="black-underline" style={{marginTop: 4}}><a href={values.src} target="_balnk">View Source</a></div>
      </div>
      <Button
      // disabled={formState && formState.syncErrors}
        typeClass=""
        // loading={auth.updating}
        style={{marginTop: 0, marginLeft: 0}}
        type="button"
        icon={<TrashIcon />}
        square
        fill="#484848"
        onClick={onRemove}
      />
    </div>
  </div>
)

export default RenderGalleryItem