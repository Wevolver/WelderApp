import React, { Component } from 'react'
import Button from '../elements/button'
import FollowTagButton from '../../containers/FollowTagButton'

class Tag extends Component {
  state = {
    hovering: false,
    timer: null
  }

  handleHover = (hovering) => {
    if(this.state.timer) clearTimeout(this.state.timer)
    const timer = setTimeout(() =>
      this.setState({
        hovering
      }), hovering ? 500 : 200)
    this.setState({
      timer
    })
  }

  render() {
    return (
      <div
        className="Tag"
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        {this.props.tagComponent}
        <div
          className="Tag-popover-animation"
          style={{
            opacity: this.state.hovering ? 1 : 0,
            display: this.state.hovering ? 'block' : 'none',
          }}
        >
          <div className="Tag-popover">
          <FollowTagButton span={this.props.span} tagId={this.props.tagId}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Tag
