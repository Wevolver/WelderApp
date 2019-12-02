import React, { Component } from 'react'
import TextField from '../elements/inputs/textField'
import TextArea from '../elements/inputs/textArea'
import { Field } from 'redux-form'
import Button from '../elements/button'
import RenderSource from './renderSource'
import SortableRow from './sortableRow'
import get from 'lodash/get'

class RenderSources extends Component {
  state = {
    editingIndexes: {}
  }
  render() {
    const {
      fields
    } = this.props
    const {
      editingIndexes
    } = this.state
    return(
      <div className="overview-fieldarray-container">
        {fields.map((row, index) =>
          <SortableRow
            key={`${get(fields.get(index), '_id.$oid')}`}
            dropTargetType="source"
            index={index}
            id={`${get(fields.get(index), '_id.$oid')}`}
            moveRow={(index1, index2) => fields.move(index1, index2)}
            component={
              <RenderSource
                index={index}
                dropTargetType="source"
                row={row}
                values={fields.get(index)}
                onEditChange={(flag, e) => {
                    if(e){
                      e.preventDefault()
                    }
                    this.setState({editingIndexes: Object.assign({}, editingIndexes, {[index]: flag})})
                  }
                }
                editing={!!editingIndexes[index]}
                onRemove={() => fields.remove(index)}
              />
            }
          />
        )}

        <div>
          <Button
            typeClass=""
            style={{margin: 'auto', marginTop: 10}}
            type="button"
            label="Add Reference"
            onClick={(e) => {
              e.preventDefault()
              fields.push({})
              this.setState(this.setState({editingIndexes: Object.assign({}, editingIndexes, {[fields.length]: true})}))
            }}
          />
        </div>

      </div>
    )
  }
}

export default RenderSources
