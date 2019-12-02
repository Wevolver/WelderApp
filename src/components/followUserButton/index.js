import React, { Component } from 'react'
import Button from '../elements/button'
import RssIcon from '../icons/rss'
import { throttle, debounce } from 'throttle-debounce'
import { heapEvent } from '../../modules/heap'


class FollowUserButton extends Component {

  constructor(props) {
    super(props)
    this.hasFollowedFromBuffer = false
    this.state = {
      throttledFollow: debounce(1000, true, () => this.follow()),
      throttledUnfollow: debounce(1000, true, () => this.unfollow()),
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.userFollowBuffer && !this.hasFollowedFromBuffer && nextProps.auth.pk) {
      this.props.followUser(nextProps.profile)
      this.hasFollowedFromBuffer=true
    }
  }

  follow = () => {
    this.props.followUser(this.props.profile)
    heapEvent.track('Follow User', {userId: this.props.profile.legacy_id})
  }

  unfollow = () => {
    this.props.unfollowUser(this.props.profile)
    heapEvent.track('Unfollow User', {userId: this.props.profile.legacy_id})
  }

  handleClick = () => {
    const {
      isFollowing
    } = this.props
    if(isFollowing){
      this.state.throttledUnfollow()
    } else {
      this.state.throttledFollow()
    }
  }

  render() {
    const {
      auth,
      isRunning,
      isFollowing,
      followersCount,
      isOwnProfile,
      profile
    } = this.props
    const isAuthenticated = !!(!isRunning && !!auth.isAuthenticated && !!auth._id && !!profile._id)
    if(isOwnProfile || !profile._id) return null
    return (
      <div className="follow-user-button">
          {isAuthenticated && <Button
            loading={isRunning}
            disabled={isRunning}
            iconLeft={
              <div>
                {!isFollowing && <div style={{marginRight: 6, marginLeft: -5, height: 20}}>
                  <RssIcon fill="#424242"/>
                </div>}
                </div>
              }
            span={followersCount}
            onClick={this.handleClick}
            label={isFollowing ? "Following" : "Follow"}
            typeClass={isFollowing ? "" : "action"}
            style={{marginLeft: 0}}
            ga={{
              category: 'Engagement',
              action: isFollowing ? 'Unfollow User' : 'Follow User' ,
              label: 'Follow Users'
            }}
          />
        }

        {!isAuthenticated &&
          <Button
            loading={isRunning}
            iconLeft={
              <div className="follow-button-icon" style={{marginRight: 6, marginLeft: -5, height: 20}}>
                <RssIcon fill="#424242"/>
              </div>
            }
            span={followersCount}
            onClick={() => {this.props.openLoginModal();this.props.followUserBuffer(this.props.profile)}}
            label={"Follow"}
            typeClass={"action"}
            style={{marginLeft: 0}}
            ga={{
              category: 'Engagement',
              action: 'Follow User Logged Out',
              label: 'Follow Users Logged Out'
            }}
          />
        }
      </div>
    )
  }
}

export default FollowUserButton
