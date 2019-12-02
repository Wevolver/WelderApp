import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import get from 'lodash/get'
import './user.css'

const UserItemProfile = ({ user, auth, profile }) => {
  let location = get(profile, 'location')
  if(!location) {
    if(get(user, 'profile.picture.city')) user = `${get(auth, 'profile.picture.city')}`
    if(get(user, 'profile.picture.country')) user = `${get(auth, 'profile.picture.country')}`
    if(get(user, 'profile.picture.country') && get(user, 'profile.picture.city')) location = `${get(user, 'profile.picture.city'), get(user, 'profile.picture.country')}`
  }
 return (
  <div className="user-container">
    <div className="user-avatar">
      {user &&
        <div
          className="user-avatar-background-image"
          style={{backgroundImage: `url(${get(profile, 'picture.source') || get(user, 'profile.picture.source')})`}}/>
      }
    </div>
    {user &&
      <div className="user-header-content">
        <h2>{user.name || `${user.first_name} ${user.last_name}`}</h2>
        <div>{profile && profile.profession}</div>
        <div>{location}</div>
      </div>

    }
  </div>
)}

export default UserItemProfile;
