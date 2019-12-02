import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import Button from '../../components/elements/button'
import DropdownMenu from '../../components/elements/dropdown'
import CrossIcon from '../../components/icons/cross'
import get from 'lodash/get'

import './user.css'

class UserItemSettings extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {
    const {
      user,
      getUserWithPk
    } = this.props
    if(!user.slug && getUserWithPk) {
      const user_id = get(user, 'id.$oid') || user.id
      getUserWithPk(user_id)
    }
  }
  render() {
    const { user, onAddMember, disabled, onEditMember, users } = this.props
    let userProfile = user
    if(!userProfile.slug) {
      const user_id = get(user, 'id.$oid') || user.id
      if(users[user_id]) userProfile = users[user_id]
    }
    return (
    <div className="user-container space-between" style={{paddingBottom: 12}}>
      <div className="user-container">
        <a target="_blank" href={`/profile/${userProfile.slug}`}>
        <div className="user-avatar small">
          {userProfile.picture && <div
            className="user-avatar-background-image"
            style={{backgroundImage: `url(${userProfile.picture.source})`}}
          />}
        </div>
        </a>
        <div>
          {(userProfile && userProfile.slug) && <div><b>{userProfile.slug}</b></div>}
          {(userProfile.first_name && userProfile.last_name) && <div className="gray">{`${userProfile.first_name} ${userProfile.last_name}`}</div>}
          {!(userProfile && userProfile.slug) && <div className="user-loader-gray"></div>}
          {!(userProfile.first_name && userProfile.last_name) && <div className="user-loader-gray"></div>}
        </div>
      </div>
      {onAddMember &&
        <Button
          // style={{background: 'grey'}}
          onClick={() => onAddMember(user)}
          label={disabled ? "Member" : "Invite"}
          disabled={disabled}
        />
      }
      {onEditMember &&
        <div style={{display: 'flex'}}>
        <DropdownMenu
          ref="dropdown"
          disabled={disabled}
          label={<Button label={user.permission === 0 ? 'Member' : 'Admin'} />}
        >
          <Button label="Admin" typeClass="subtle" onClick={() =>{
            onEditMember(Object.assign({}, user, {permission: 1}))
            this.refs.dropdown.hide()
            }} />
          <Button label="Member" typeClass="subtle" onClick={() => {
              onEditMember(Object.assign({}, user, {permission: 0}))
            this.refs.dropdown.hide()
            }}
             />
        </DropdownMenu>
        <Button
          // style={{background: 'grey'}}
          onClick={() => onEditMember(Object.assign({}, user, {deleted: true}))}
          square
          icon={<CrossIcon fill="#ffffff"/>}
          disabled={disabled}
        />
        </div>
      }
    </div>
  )}
}

export default UserItemSettings;
