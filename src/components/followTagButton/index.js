import React, { Component } from 'react'
import Button from '../elements/button'
import RssIcon from '../icons/rss'
import { throttle, debounce } from 'throttle-debounce'
import { heapEvent } from '../../modules/heap'


class FollowTagButton extends Component {

  constructor(props) {
    super(props)
    this.hasFollowedFromBuffer = false
    this.state = {
      isFollowing: props.tagsFollowed ? props.tagsFollowed.indexOf(props.tagId) > -1 : false,
      fetching: false,
      initialFollowing: props.tagsFollowed ? props.tagsFollowed.indexOf(props.tagId) > -1 : false,
      throttledFollow: debounce(1000, true, () => this.follow()),
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.tagsFollowed === null && nextProps.tagsFollowed !== null) {
      const isFollowing = nextProps.tagsFollowed ? nextProps.tagsFollowed.indexOf(nextProps.tagId) > -1 : false
      this.setState({
        isFollowing,
        initialFollowing: isFollowing,
      })
    }

    if(nextProps.tagsFollowed !== null && !this.hasFollowedFromBuffer) {
      const isFollowing = nextProps.tagsFollowed ? nextProps.tagsFollowed.indexOf(nextProps.tagId) > -1 : false
      if(nextProps.tagFollowBuffer && nextProps.isAuthenticated && !isFollowing) {
        this.props.followTag(nextProps.tagFollowBuffer, false)
        this.setState({fetching: true, isFollowing: true})
        this.hasFollowedFromBuffer = true
        heapEvent.track('Follow Tag', {tagId: nextProps.tagFollowBuffer})
      }
    }

    if(this.props.tagsFollowed
      && nextProps.tagsFollowed
      && (nextProps.tagsFollowed.length !== this.props.tagsFollowed.length ||
       nextProps.tagId !== this.props.tagId )) {

      this.setState({
        isFollowing: nextProps.tagsFollowed ? nextProps.tagsFollowed.indexOf(nextProps.tagId) > -1 : false,
        fetching: false,
      })
      this.hasFollowedFromBuffer = false
    }
  }

  follow = () => {
    const {
      tagsFollowed,
      tagId,
      tag
    } = this.props
    const isFollowing = tagsFollowed ? tagsFollowed.indexOf(tagId) > -1 : false

    if(this.props.addRemoved){
      this.props.addRemoved(tag)
    }

    this.setState({fetching: true, isFollowing: !this.state.isFollowing})
    this.props.followTag(tagId, isFollowing)
    heapEvent.track('Follow Tag', {tagId: tagId})
  }

  handleClick = () => {
    this.state.throttledFollow()
  }

  render() {
    const {
      tagsFollowed,
      isAuthenticated,
      isRunning,
      tagId,
      tag,
      tagCount,
      noCount,
      span
    } = this.props

    let count = 1
    if(tag !== undefined){
      count = tag.followCount
    } else if(span !== undefined){
      count = span
    } else {
      count = tagCount
    }
    if(this.state.initialFollowing !== this.state.isFollowing) {
      count = this.state.isFollowing ? count + 1 : count - 1
    }

    if(isNaN(parseFloat(count)) || noCount){
      count = undefined
    }

    return (
      <div>
        {isAuthenticated && <Button
          loading={!tagsFollowed}
          disabled={isRunning}
          iconLeft={
            <div>
            {!this.state.isFollowing && <div style={{marginRight: 6, marginLeft: -5, height: 20}}>
              <RssIcon fill="white"/>
            </div>}
            </div>
          }
          span={count}
          onClick={this.handleClick}
          label={this.state.isFollowing ? "Following" : "Follow"}
          typeClass={this.state.isFollowing ? "" : "action"}
          style={{marginLeft: 0}}
      />
    }

        {!isAuthenticated &&
          <Button
            loading={isRunning}
            iconLeft={
              <div className="follow-button-icon" style={{marginRight: 6, marginLeft: -5, height: 20}}>
                <RssIcon fill="white"/>
              </div>
            }
            span={count}
            onClick={() => {this.props.noAuthFollowTag(tagId, false); this.props.openLoginModal()}}
            label={"Follow"}
            typeClass={"action"}
            style={{marginLeft: 0}}
          />
        }
      </div>
    )
  }
}

export default FollowTagButton
