import React, { Component } from 'react'
import '../layout.css'
import './profile.css'

import ProfileUserDetails from '../../../containers/Profile/profileUserDetails'
import ProjectFollowList from '../../../containers/Profile/projectFollowList'
import ProfileHeader from '../../../containers/Profile/profileHeader'
import TagFollowList from '../../../containers/Profile/tagFollowList'
import ActivityList from '../../../containers/Profile/activityList'
import ProjectList from '../../../containers/Profile/projectList'

import MainContainer from '../../../components/layout/mainContainer'
import Loader from '../../../components/elements/loader'
import Button from '../../../components/elements/button'
import Box from '../../../components/box/box'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet"
import get from 'lodash/get'
import ProjectBottomLinks from '../project/projectBottomLinks'
import auth from '../../../modules/auth'

class ProfileComponent extends Component {

  state = {
    firstLoad: true
  }

  componentWillMount() {
    const {
      getUser,
      match
    } = this.props
    getUser(match.params.userSlug)
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      match,
      isAuthenticated
    } = nextProps

    const nextUser = nextProps.match.params.userSlug
    const currentUser = this.props.match.params.userSlug || ""

    if(nextUser !== currentUser) {
      this.props.getUser(match.params.userSlug)
    }
  }

  render() {
    const {
      match,
      user,
      openModal,
      numberOfProjects,
      selectedTab,
      changeProfileTab
    } = this.props

    const isOwnProfile = (this.props.user && this.props.user._id && this.props.auth._id) && this.props.user._id === this.props.auth._id

    let tabs = [
      {title: "Projects", id: 0, selected: selectedTab === 0},
      {title: "Tags", id: 1, selected: selectedTab === 1},
    ]
    
    const unconfirmedLogIn = (localStorage.getItem('wevolverUser') && !this.props.auth.isAuthenticated) || this.props.auth.isRunning
    if (unconfirmedLogIn && !auth.getProfile()['user_id']) return null
    return (
      <div id="site-content profile">
        <Helmet>
          <title> {`${user && user.name || 'user'} on Welder`}</title>
          <meta name="description" content={ user && (user.bio || `${user.name} is a member of Welder where you can discover technologies like robotics, exoskeletons and drones. Understand the design, characteristics, and engineering process.`) } data-react-helmet="true" />
        </Helmet>
        <ProfileHeader match={match}/>
        <MainContainer>
           <div className="row profile-main-container" style={{height: '100%', minHeight: 'calc(100vh - 224px)'}}>
            {user && <ProfileUserDetails userSlug={get(match, 'params.userSlug')} match={match}/>}
            <div className="eight columns profile-content-section">
              {user && <ProjectList match={match} isOwnProfile={isOwnProfile} />}
              <h3 style={{marginBottom: '1rem'}}> Following </h3>
              {user && <Box style={{height: 'unset'}} bodyStyle={{paddingLeft: 0, paddingRight: 0}} tabs={tabs} tabStyle={{paddingLeft: 0}} onTabSelect={(e) => changeProfileTab(e)} >
                {selectedTab === 0  && <ProjectFollowList match={match} isOwnProfile={isOwnProfile} userSlug={get(match, 'params.userSlug')}/> }
                {selectedTab === 1 && <div> <TagFollowList followedTags={this.props.auth.tags_followed || []}/> </div> }
              </Box>}
              {user && <ActivityList userSlug={get(match, 'params.userSlug')}/>}
            </div>
          </div>
        </MainContainer>
        <div style={{borderBottom: '1px solid rgb(230, 232, 235)', width: '100%', height: 1}} />
        <ProjectBottomLinks />
      </div>
    )
  }
}

export default ProfileComponent
