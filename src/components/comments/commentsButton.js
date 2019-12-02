import React, { Component } from 'react'
import Button from '../../components/elements/button'
import CommentsIcon from '../icons/comments'
import scrollToElement from 'scroll-to-element'

class CommentsButton extends Component {

  scrollToComments = () => {
   scrollToElement('#projects-comments', {duration: 600, ease: 'in-out-quad'});
  }
  render() {

    const {
      commentsCount
    } = this.props
    if (!commentsCount && commentsCount !== 0) return null
    return (

          <Button
            onClick={this.scrollToComments}
            iconLeft={<CommentsIcon fill="#fff"/>}
            label={<div style={{marginLeft: 10}}>{`${commentsCount}`}</div>}
          />

    )
  }
}

export default CommentsButton
