import React, { Component } from 'react'
import TextField from '../elements/inputs/textField'
import { Field } from 'redux-form'
import Button from '../elements/button'
import MoveIcon from '../icons/move'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor,
  ConnectDragPreview,
} from 'react-dnd'
import { XYCoord } from 'dnd-core'

const rowTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null
    }
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // // Don't replace items with themselves

    if (dragIndex === hoverIndex) {
      return
    }
    // // Determine rectangle on screen
    const hoverBoundingRect = component.getDecoratedComponentInstance().node.getBoundingClientRect()

    // // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // // Only perform the move when the mouse has crossed half of the items height
    // // When dragging downwards, only move when the cursor is below 50%
    // // When dragging upwards, only move when the cursor is above 50%

    // // Dragging downwards
    // if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    //   return
    // }

    // // // Dragging upwards
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return
    // }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex)
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  },
}


const rowSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id , index: props.index};
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('Drop')
    // CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class SortableRow extends Component {
// function SortableRow({ component, connectDragSource, connectDragPreview, connectDropTarget }){
  render() {
  const { component, connectDragSource, connectDragPreview, connectDropTarget, isDragging } = this.props
  const opacity = isDragging ? 0.2 : 1
  return connectDragPreview(
    <div ref={node => (this.node = node)}  style={{opacity: opacity}}>
      {connectDropTarget(
        <div style={{display: 'flex'}}>
        {connectDragSource(<div className="drag-handle"><MoveIcon width={12} height={12}/></div>)}
          <div style={{flexGrow: 1}}>{component}</div>
        </div>
      )}
    </div>
  )}
}

export default DropTarget((props) => {return props.dropTargetType}, rowTarget, (connect: DropTargetConnector) => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource((props) => {return props.dropTargetType}, rowSource, collect)(SortableRow));


// export default RenderSpecRow