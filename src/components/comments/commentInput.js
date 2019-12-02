import React, { Component } from 'react'
import Button from '../../components/elements/button'
import TextArea from '../elements/inputs/textArea'
import get from 'lodash/get'

class CommentInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newComment: props.replyingTo ? `@${props.replyingTo} ` : ''
    }
  }
  handleSubmit = () => {
    if(this.state.newComment) {
      this.props.onSubmit(this.state.newComment, get(this.props.parent, '$oid'))
      if(this.props.skipLoading) {
        this.setState({newComment: ''})
        if(this.props.onCancel) this.props.onCancel()
      }
      if(this.props.onLoad) this.props.onLoad()
    }
  }
  moveCaretAtEnd(e) {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  render() {
    const {
      userName,
      parent,
      onCancel,
      autofocus,
      replyingTo
    } = this.props

    return (
       <div style={{marginTop: parent ? 0 : 40, marginLeft: parent ? 58 : 0}}>
        {userName && <div style={{marginBottom: 8}}>Respond as <b>{userName}</b> </div>}
          <TextArea
            limit={1500}
            placeholder="What's your question or feedback?"
            autofocus={autofocus}
            input={{
              value: this.state.newComment,
              onChange: (e) => this.setState({newComment: e.target.value}),
              onFocus: (e) => this.moveCaretAtEnd(e),
            }}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          {onCancel && false && 
            <Button
              label="Cancel"
              onClick={onCancel}
            />
          }
          <Button
            disabled={!this.state.newComment}
            label={replyingTo ? "Reply" : "Respond"}
            loading={this.props.skipLoading ? false : this.props.loading}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default CommentInput
