import React, { Component } from 'react'
import Button from '../elements/button'
import RenderSpecRow from './renderSpecRow'
import SortableRow from './sortableRow'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import get from 'lodash/get'

const renderSpecs = ({ fields=[] }) => (
  <div className="overview-fieldarray-container">
    {fields.length > 0 && <div className="specs-row-labels">
      <div className="spacer-front"></div>
      <div className="label">Description</div>
      <div className="label">Metric</div>
      <div className="label">Units</div>
      <div className="spacer-back"></div>
    </div>}
    {fields.map((row, index) =>
      <SortableRow
        key={`${get(fields.get(index), '_id.$oid')}`}
        index={index}
        dropTargetType="spec"
        id={`${get(fields.get(index), '_id.$oid')}`}
        moveRow={(index1, index2) => fields.move(index1, index2)}
        component={
          <RenderSpecRow
            index={index}
            row={row}
            onRemove={() => fields.remove(index)}
          />
        }
      />
    )}

    <div style={{width: '100%'}}>
      <Button
        // disabled={formState && formState.syncErrors}
        typeClass=""
        // loading={auth.updating}
        style={{margin: 'auto', marginTop: 10}}
        type="button"
        label="Add Specification"
        onClick={(e) => {
            e.preventDefault()
            fields.push({})
        }}
      />
    </div>

  </div>
)
export default renderSpecs //DragDropContext(HTML5Backend)(renderSpecs)
