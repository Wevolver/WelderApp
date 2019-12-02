import React, { Component } from 'react'
import get from 'lodash/get'
import TextField from '../elements/inputs/textField'
import TextArea from '../elements/inputs/textArea'
import { Field } from 'redux-form'
import Button from '../elements/button'
import RenderGalleryItem from './renderGalleryItem'
import SortableRow from './sortableRow'
import VideoOrImageInput from './videoOrImageInput'
import { API } from '../../constants/api'


const renderSources = ({ fields }) => (
  <div className="overview-fieldarray-container">
    {fields.map((row, index) =>
      <SortableRow 
        key={`${get(fields.get(index), '_id.$oid')}`}
        dropTargetType="source"
        index={index}
        id={`${get(fields.get(index), '_id.$oid')}`}
        moveRow={(index1, index2) => fields.move(index1, index2)}
        component={
          <RenderGalleryItem
            index={index}
            values={fields.get(index)}
            row={row}
            dropTargetType="gallery"
            onRemove={() => fields.remove(index)}
          />
        }
      />
    )}
    <VideoOrImageInput
      onAdd={value => fields.push(value)}
    />
  </div>
)

export default renderSources