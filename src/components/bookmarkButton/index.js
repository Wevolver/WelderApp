import React, { Component } from 'react'
import Button from '../elements/button'
import BookmarkIcon from '../icons/bookmark'
import CrossIcon from '../icons/cross'
import BookmarkedIcon from '../icons/bookmarked'
import RssIcon from '../icons/rss'
import RssFollowedIcon from '../icons/rss-followed'
import ReactGA from 'react-ga';
import './bookmark.css'
import Cookies from 'universal-cookie';
import { heapEvent } from '../../modules/heap'
const cookies = new Cookies();


class BookmarkButton extends Component {

  state = {
    requestedFollow: false,
    count: 0
  }

  componentDidMount = () => {
    const {
      projectFollowRequest,
      projectUnfollowRequest,
      projectOid,
      count
    } = this.props

    this.setState({count})
    if(this.props.followBuffer && this.props.followBuffer === projectOid && this.props.auth && this.props.auth.pk) {
      projectFollowRequest(projectOid)
      this.setState({requestedFollow: true, requestedUnfollow: false})
    }

    if(this.props.unfollowBuffer && this.props.unfollowBuffer === projectOid && this.props.auth && this.props.auth.pk) {
      projectUnfollowRequest(projectOid)
      this.setState({requestedFollow: false, requestedUnfollow: true})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      projectFollowRequest,
      projectUnfollowRequest,
      projectOid,
    } = this.props

    if(nextProps.followBuffer && nextProps.followBuffer === projectOid && nextProps.auth && nextProps.auth.pk) {
      projectFollowRequest(projectOid)
      this.setState({requestedFollow: true, requestedUnfollow: false, count: this.state.count + 1})
    }

    if(nextProps.unfollowBuffer && nextProps.unfollowBuffer === projectOid && nextProps.auth && nextProps.auth.pk) {
      projectUnfollowRequest(projectOid)
      this.setState({requestedFollow: false, requestedUnfollow: true, count: this.state.count - 1})
    }
  }

  onBookmark = () => {
    const {
      openModal,
      followProject,
      isFollowing,
      auth,
      projectOid,
    } = this.props

    if(!auth.isAuthenticated){
      openModal('login');
    }

    followProject(projectOid, window.location.pathname)
    this.setState({requestedFollow: true, requestedUnfollow: false, count: this.state.count + 1})
    if(cookies.get('accepts-cookies')){
      ReactGA.event({
        category: 'Engagement',
        action: 'Follow',
        label: 'Follow Project'
      });
      heapEvent.track('Follow Project', {projectId: projectOid});
    }
  }

  onUnbookmark = () => {
    const {
      openModal,
      projectUnfollowRequest,
      auth,
      isFollowing,
      projectOid,
    } = this.props

    projectUnfollowRequest(projectOid)
    if(!auth.isAuthenticated){
      openModal('register');
    } else {
      this.setState({requestedFollow: false, requestedUnfollow: true, count: this.state.count - 1})
    }
  }

  render() {
    const {
      isFollowing,
      square,
      auth,
      count
    } = this.props

    const bookmarked = auth.isAuthenticated && (isFollowing || this.state.requestedFollow) && !this.state.requestedUnfollow

    return (
      <div>
        {square &&
          <Button
            iconLeft={ bookmarked ?
              <div className="follow-button-icon" style={{marginRight: 6, marginLeft: -5, height: 20}}>
                <RssFollowedIcon fill="#424242"/>
              </div>
              :
              <div className="follow-button-icon" style={{marginRight: 6, marginLeft: -5, height: 20}}>
                <RssIcon fill="#424242"/>
              </div>
            }
            largeIcon
            label={<div style={{marginLeft: 8, color: '#424242'}}>{isNaN(parseFloat(this.state.count)) ? undefined : this.state.count}</div>}
            typeClass = "subtle"
            style={{padding: 0}}
            onClick={ () => bookmarked ? this.onUnbookmark() : this.onBookmark() }
          />
        }
        {!square &&
          <Button
            iconLeft={ bookmarked ?
              <div className="follow-button-icon" style={{marginRight: 6, marginLeft: -5, height: 24}}>
                <RssFollowedIcon fill="#fff"/>
              </div>
              :
              <div className="follow-button-icon" style={{marginRight: 6, marginLeft: -5, height: 20}}>
                <RssIcon fill="#424242"/>
              </div>
            }
            label={ bookmarked ? "Following" : "Follow" }
            span={isNaN(parseFloat(this.state.count)) ? undefined : this.state.count}
            typeClass={ bookmarked ? "button-main" : "action" }
            onClick={ () => bookmarked ? this.onUnbookmark() : this.onBookmark() }
          />
        }
      </div>
    )
  }
}

export default BookmarkButton
