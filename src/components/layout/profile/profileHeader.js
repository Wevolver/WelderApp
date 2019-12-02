import React, { Component } from 'react'

import UserItemProfile from '../../../components/user/userItemProfile'
import SubNavbar from '../../../components/navbar/subNavbar'
import FollowUserButton from '../../../containers/FollowUserButton'

class ProfileHeader extends Component {

  componentWillMount() {}
  componentWillReceiveProps = (nextProps) => {}

  render() {

    const {
      user,
      profile,
      auth
    } = this.props

    return(
      <div className="profile-header">
        <SubNavbar style={{background: 'white', borderBottom: 'none'}} fitted>
          <UserItemProfile auth={auth} user={user} profile={profile}/>
          <FollowUserButton user={user} />
        </SubNavbar>
      </div>
    )
  }
}

export default ProfileHeader
