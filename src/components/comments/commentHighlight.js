import React, { Component } from 'react'

class CommentHighlight extends Component {

  state = {
    class: 'new-comment-highlight',
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ class: 'new-comment-highlight active' });
    }, 20)
    setTimeout(() => {
      this.setState({ class: 'new-comment-highlight' });
    }, 5000)
  }

  render() {
    return (
      <div className={this.state.class}/>
    )
  }
}

export default CommentHighlight
