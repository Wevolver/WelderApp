import React, { Component } from 'react'

import Card from './sortStepCard'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import Button from '../elements/button'

class SortContainer extends Component {
  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      canDrag: false
    }
  }

  moveCard(dragIndex, hoverIndex) {
    const { steps } = this.props
    const dragCard = steps[dragIndex]
    const newSteps = update(this.props.guide, {
      steps: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    })
    this.props.moveSteps(newSteps)
  }

  handleClick(event, cancel) {
    if(cancel){
      const newSteps = update(this.props.guide, {
        steps: { $set: this.state.originalOrder }
      })
      this.props.moveSteps(newSteps)
    } else{
      if(!this.state.canDrag){
        this.setState({ originalOrder: this.props.steps });
      }
      if(this.state.canDrag){
        let guide = this.props.guide
        let assemblyGuide = new File([new Blob([JSON.stringify(guide)], {type: 'text'})], this.props.fileName)
        this.props.save(assemblyGuide, '/', true)
      }
    }
    this.setState({ canDrag: !this.state.canDrag });
  }

  render() {
    const {canDrag } = this.state
    const {
      steps
    } = this.props

    const style = {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      cursor: this.state.canDrag ? "move" : "default !important",
    }

    return (
      <div style={{display: 'flex', flexDirection: 'column', padding: '1rem 0 1rem 0', margin: '20px 0 0 0', borderTop: '1px solid #bdbdbd' }}>
        <span style={{fontSize: 14}}>Steps:</span>
        <div style={style}>
          {steps && steps.map((step, i) => (
            <Card
              key={step.stepName + i}
              index={i}
              id={step.stepName + i}
              toggle={step.toggle || 'images'}
              image={step.images.length > 0 ? step.images[0].source : undefined}
              video={step.video ? step.video : undefined}
              moveCard={this.moveCard}
              canDrag={canDrag}
            />
          ))}
        </div>
      <div style={{marginTop: '1rem', marginLeft: 'calc(.5rem - 4px)', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      {this.state.canDrag && <button square onClick={(e) => this.handleClick(e, true)} className="button-main"> Cancel </button>}
      {steps && this.props.editable && steps.length > 1 && <button onClick={this.handleClick} className="button-main"> {this.state.canDrag ? "Save Order" : "Rearrange Steps"}</button>}
        {!this.state.canDrag && this.props.editable && <Button
          label="Add Step"
          typeClass="action"
          onClick={() => this.props.onAddStep(this.props.steps.length || 0) }
        />}
      {this.state.canDrag && <p style={{color: '#757575', marginLeft: '5rem'}}>Drag and drop to reorder steps</p>}
      </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(SortContainer)
