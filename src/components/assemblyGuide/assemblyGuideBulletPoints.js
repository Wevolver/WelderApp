import React, { Component } from 'react'
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import EditableBulletPoint from './editableBulletPoint'

class AssemblyGuideBulletPoints extends Component {
  
  state = {
    editingIndex: -1
  }

  handleOnEdit = (index) => {
    this.setState({editingIndex: index})
  }
  render() {
    const {
      bulletPoints,
    } = this.props
    let parsedBulletPoints = bulletPoints
    if(!bulletPoints || bulletPoints.length < 1) {
      this.props.onAddBullet(0)
    }

    return (
      <div style={{width: '100%'}}>
        {parsedBulletPoints.map((bullet, index) => 
          <EditableBulletPoint
            bulletPoint={bullet}
            index={index}
            key={index}
            editingIndex={this.state.editingIndex}
            onEdit={this.handleOnEdit}
            onAddBullet={this.props.onAddBullet}
            onDeleteBullet={this.props.onDeleteBullet}
            onChange={this.props.onChange}
            onIndent={this.props.onIndent}
          />
        )}
      </div>
    )
  }
}

AssemblyGuideBulletPoints.defaultProps = {
  bulletPoints: []
}

export default AssemblyGuideBulletPoints
