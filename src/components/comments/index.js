import React, { Component } from 'react'
import Button from '../elements/button'
import Comment from '../../containers/Comments/Comment'
import moment from 'moment'
import TrackVisibility from 'react-on-screen'
import ReactGA from 'react-ga'
import CommentInput from './commentInput'
import get from 'lodash.get'

import './comments.css'

const replyShowFirstPage = 3
class SendEventIfVisible extends Component {

  state = {
    sent: false,
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const {
      isVisible
    } = nextProps
    if(isVisible && !this.state.sent) {
      this.setState({sent: true})
      ReactGA.event({
        category: 'Engagement',
        action: 'Comment',
        label: 'Saw Comment'
      })
    }
  }

  render() {
    return (<div></div>)
  }
}

class Comments extends Component {

  state = {
    limit: 3,
    replyLimits: {},
  }
  componentDidMount = () => {
    this.props.getComments(this.props.project._id.$oid)
  }

  handleSubmit = (message, parentItem) => {
    const {
      auth,
      project,
      users,
      comments
    } = this.props

    this.props.submitComment({
      text: message,
      author: auth.legacy_id,
      author_id: auth._id,
      dateCreated: Date.now(),
      parentItem: parentItem || null
    })

    ReactGA.event({
      category: 'Engagement',
      action: 'Comment',
      label: parentItem ? 'Added Reply Comment' : 'Added Comment'
    })
    let authors = []
    Object.keys(comments).map(key => {
      authors = [...authors, ...comments[key].map(item => item.author)]
    })
    let uniqueIds = [...new Set(authors)];
    let emails = uniqueIds.map(id => (id !== auth.legacy_id ? get(users, `${id}.email`) : null));
    emails.push("info@wevolver.com")
    emails.push("richard@wevolver.com")
    emails.filter(Boolean).forEach(function (value) {
      let payload = {
        to_email: value,
        message: message,
        user_name: auth.first_name + " " + auth.last_name,
        project_name: project.name,
        project_slug: "https://www.wevolver.com/" + project.user_slug + "/" + project.slug,
        timestamp: moment(Date.now()).format('lll'),
      }
      fetch("https://2zzjnr884a.execute-api.us-west-1.amazonaws.com/api/send/reply",
      {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( payload )
      })
      .then(function(res){ return res })
    });
  }

  renderComments = () => {
    const {
      comments,
      auth
    } = this.props
    let userBuffer = {}
    const rootComments = get(comments, 'root') || null
    if (!rootComments) return null
    const reversedOrder =  [...rootComments].reverse().slice(0, this.state.limit)
    return reversedOrder.map((comment) => {
      const author_id = get(comment, 'author_id.$oid')
      const shouldFetch = !userBuffer[author_id || comment.author]
      userBuffer[comment.author] = true
      const replies = get(comments, get(comment, '_id.$oid')) || []
      const replyLimit = this.state.replyLimits[get(comment, '_id.$oid')] || replyShowFirstPage
      const replyComments = replies.slice(0,replyLimit).map((comment) => {
        const author_id2 = get(comment, 'author_id.$oid')
        const shouldFetch2 = !userBuffer[author_id2 || comment.author]
        userBuffer[comment.author] = true
        return (<div style={{minHeight: 70, marginLeft: 58}}><TrackVisibility><Comment
          key={get(comment, '_id.$oid')}
          onReply={this.handleSubmit}
          shouldFetch={shouldFetch2}
          comment={comment}
          numberOfComments={replies.length}
          openModal={this.openModal}
          isAuthenticated={auth.isAuthenticated}
          reply={true}
        /></TrackVisibility></div>)
      })
      return (
        <div key={get(comment, '_id.$oid')}>
        <div style={{minHeight: 70}}>
        <TrackVisibility><Comment
          onReply={this.handleSubmit}
          shouldFetch={shouldFetch}
          openModal={this.openModal}
          numberOfComments={reversedOrder.length + replies.length}
          isAuthenticated={auth.isAuthenticated}
          comment={comment}
        /></TrackVisibility>
        </div>
        <div style={{paddingBottom: replyComments.length > 0 ? 8 : 0, paddingTop: replyComments.length > 0 ? 20 : 0}}>{replyComments}</div>
        {(replyLimit <= replyComments.length && replies.length > replyShowFirstPage) &&
          <div style={{marginLeft: 58, paddingLeft: 0}} className="comment-name link">
          <div
            onClick={() => this.setState({replyLimits: {
              [get(comment, '_id.$oid')]: replyLimit + 5
            }})}
          >
            {replies.length - replyLimit} more replies...
          </div>
          </div>
        }
        </div>
      )
    })
  }
  
  isEndOfList = () => {
    const {
      comments,
    } = this.props
    const rootComments = get(comments, 'root') || []
    return (rootComments.length <= this.state.limit)
  }

  openModal = (modal) => {
    if(!this.props.commentBuffer){ this.props.setCommentBuffer() }
    this.props.openModal(modal)
  }

  loadMoreComments = () => {
    this.setState({
      limit: this.state.limit + 5
    })
  }
  render() {
    const {
      comments,
      auth,
      commentsEnabled,
    } = this.props
    if(commentsEnabled === false) return null
    const rootComments = get(comments, 'root') || []
    let commentsCount = null
    if(comments) {
      commentsCount = 0
      Object.keys(comments).forEach(key => {
        commentsCount += comments[key].length
      })
    }
    const full_name = auth ? `${auth.first_name} ${auth.last_name}` : '-'
    return (
      <div className="comments-wrapper" id="projects-comments">
      <div className="comments-container">
        <h3 style={{ marginTop: 48 }}>Questions & Feedback <span style={{fontWeight: 400}}>{commentsCount || ''}</span></h3>

        {auth.isAuthenticated &&
          <CommentInput
            autofocus={false}
            onSubmit={this.handleSubmit}
            userName={full_name}
            numberOfComments={rootComments.length}
            skipLoading
          />
        }
        {!auth.isAuthenticated &&
          <div
            className="fake-input-area">
                <div>What's your question or feedback?</div>
                <Button
                  label="SIGNUP / LOGIN"
                  onClick={() => this.openModal('register')}
                />
              </div>
        }
        {comments.length < 1 &&
          <div
            style={{
              textAlign: 'center',
              color: '#aaa',
              paddingBottom: 10,
              marginTop: 40
            }}
          >
           There are no responses yet. Be the first to respond to this project.
          </div>
        }
        {this.renderComments()}
        {!this.isEndOfList() && 
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Button
            label="MORE"
            onClick={this.loadMoreComments}
          />
          </div>
        }
        <TrackVisibility>
          <SendEventIfVisible partialVisibility />
        </TrackVisibility>
      </div>
      </div>
    )
  }
}

export default Comments
