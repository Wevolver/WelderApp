import { DragSource, DropTarget } from 'react-dnd'
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import flow from 'lodash/flow'
import { exctractYoutubeVideoId } from '../../modules/helpers'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
  canDrag(props, monitor) {
     return props.canDrag;
  }

}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) {
      return
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const clientOffset = monitor.getClientOffset()
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return
    }

    if (clientOffset.y > hoverBoundingRect.bottom || clientOffset.y < hoverBoundingRect.top){
      return
    }

    props.moveCard(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
}

class Card extends Component {

  render() {

    const { image, isDragging, connectDragSource, connectDropTarget, canDrag, toggle, video } = this.props
    const style = {
      margin: '.5rem',
      backgroundColor: 'white',
      position: 'relative',
      height: 60,
      width: 80,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }

    let stepCountStyle = {
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingLeft: '3px',
      background: '#fff',
      paddingRight: '3px',
      border: '1px solid #424242',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }

    let imageSrc = image
    if(toggle === 'video') {
      if(video) {
        imageSrc = `https://img.youtube.com/vi/${exctractYoutubeVideoId(video)}/0.jpg`
      } else {
        imageSrc = null
      }
    }

    if(!imageSrc){
      style['background'] = '#f7f9fa'
      stepCountStyle['background'] = '#f7f9fa'
      stepCountStyle['border'] = 'none'
      stepCountStyle['color'] = '#757575'
      stepCountStyle['position'] = 'relative'
      style['border'] = '1px solid #bdbdbd'
    } else {
      style['backgroundImage'] = `url(${imageSrc})`
      style['border'] = 'none'
      style['backgroundSize'] = 'cover'
      style['backgroundPosition'] = 'center'
    }

    const opacity = isDragging ? 0.0 : 1

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity, cursor: canDrag ? "move" : "default" }}>
        <div style={stepCountStyle}>{this.props.index + 1}</div>
      </div>,
    ))
  }
}


export default flow([
  DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
])(Card);
