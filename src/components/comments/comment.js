import React, { Component } from 'react'
import moment from 'moment'
import Linkify from 'react-linkify';
import CommentInput from './commentInput'
import scrollToComponent from 'react-scroll-to-component'
import CommentHighlight from './commentHighlight'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

class Comments extends Component {
  state = {
    replying: false,
    scrolled: false,
    loading: false,
    highlight: false,
  }

  componentDidMount = () => {
     const {
      comment,
      getUserWithPk,
      shouldFetch,
      isVisible
    } = this.props
    const author_id = get(comment, 'author_id.$oid')
    if(shouldFetch) {
      getUserWithPk(author_id || comment.author)
    }
    let params = (new URL(document.location)).searchParams;
    const highlight = get(comment, '_id.$oid') === params.get('c')
    if(comment.new || highlight) {
      this.setState({highlight: true})
      this.shouldScroll = setTimeout( this.scrollToThisComment, 500)
    }
  }

  renderTime = (millis) => {
    if(!millis) return ''
    const diff = moment().diff(moment(millis), 'days')
    let time = moment(millis).fromNow()
    if(diff > 0) time = moment(millis).format("DD MMM")
    return time
  }

  scrollToThisComment = () => {
    let scroller = scrollToComponent(this.Comment, { offset: -200, align: 'top', duration: 800});
    this.setState({scrolled: true})
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if(this.props.numberOfComments !== nextProps.numberOfComments){
      this.setState({loading: false, replying: false})
    }
    // if(this.props.comment.new && !this.props.isVisible && !nextProps.isVisible && !this.state.scrolled) this.scrollToThisComment()
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(this.props.comment.new && this.props.isVisible && !this.state.scrolled){
      clearTimeout(this.shouldScroll)
      this.setState({scrolled: true})
    }
  }

  startReply = () => {
    const {
      isAuthenticated,
      openModal
    } = this.props

    this.setState({replying: !this.state.replying})
    if(!isAuthenticated && openModal) {
      openModal('register')
    }
  }
  
  render() {
    const {
      comment,
      user,
      reply,
      isAuthenticated,
      isVisible,
    } = this.props
    const full_name = user ? `${user.first_name} ${user.last_name}` : '-'
    return (
      <div
        className={reply ? "comment-container reply" : "comment-container"}
        ref={(section) => { this.Comment = section; }}
      >
        {(comment.new || this.state.highlight) && <CommentHighlight />}
        <div className="comment-header">

          <Link
            to={`/profile/${get(user, 'slug')}`}
          >
          {get(user, 'profile.picture.source') &&
            <div
              className="comment-image"
              style={{backgroundImage: `url('${get(user, 'profile.picture.source')}')`}}
            />
          }
          {!get(user, 'profile.picture.source') &&
            
            <div
              className="comment-image"
              style={{background: "#424242"}}
            >
            {(user && user.first_name) ? user.first_name.slice(0,1) : ''}
            </div>
          }
          </Link>
          <div>
            {user &&
              <Link
                to={`/profile/${get(user, 'slug')}`}
              ><div className="comment-name link">{full_name}</div>
              </Link>
            }
            {comment.dateCreated && <div className="comment-date">{this.renderTime(comment.dateCreated.$date)}</div>}
          </div>
        </div>

        <div className="comment-text">
          <Linkify  properties={{target: '_blank'}}>{comment.text}</Linkify>
        </div>
        <div className="comment-reply-button"><div className={this.state.replying ? 'active': ''} onClick={this.startReply}>Reply</div></div>
        {(isAuthenticated && user && this.state.replying) && <CommentInput
          autofocus
          replyingTo={full_name.toLowerCase().replace(' ', '.')}
          parent={comment.parentItem || comment._id}
          onSubmit={this.props.onReply}
          onLoad={() => this.setState({loading: true})}
          loading={this.state.loading}
          onCancel={()=>this.setState({replying: false})}
        />}
      </div>
    )
  }
}

export default Comments
