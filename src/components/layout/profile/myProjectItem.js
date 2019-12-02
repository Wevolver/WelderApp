import React, { Component } from 'react';
import './profile.css';

import { Link } from 'react-router-dom'
import BookmarkButton from '../../../containers/BookmarkButton'

class MyProjectItem extends Component {
  render() {
    const {
      project,
      isOwnProfile,
      auth,
      noFollow
    } = this.props
    let isMember = (project.members.find( p => auth.legacy_id === p.id));
    return (
      <div className="project-item-container">
        <div className="project-item-avatar">
          {project.picture &&

              <Link to={`${project.link}`}>
             <div
            className='profile-avatar-background-image'
            style={{backgroundImage: `url(${project.picture.source})`}}
          /></Link>}
        </div>
        <div className="desktop-profile-project">
          <div>
            <div>
              <Link to={`${project.link}`}>{project.name}</Link>
              {project.privacy === 2 && <span className="private-tag">private</span>}
            </div>
            <div className='profile-project-description'>{project.description}</div>
            <div style={{color: '#757575', fontSize: 14}}>{project.university === "none" ? "" : project.university}</div>
          </div>
          {!isOwnProfile && !isMember && <BookmarkButton isFollowing={project.bookmarked || false} projectOid={project && project._id ? project._id.$oid : ""} />}
        </div>

        <div className="mobile-profile-project">
          <div className="mobile-project-item-header">
            <Link to={`${project.link}`}>{project.name}</Link>
            {!isOwnProfile && !isMember && <BookmarkButton isFollowing={project.bookmarked || false} projectOid={project && project._id ? project._id.$oid : ""} square />}
          </div>
          <div className='profile-project-description'>{project.description}</div>
          <div style={{color: '#757575', fontSize: 14}}>{project.university === "none" ? "" : project.university}</div>
          {project.privacy === 2 && <span className="private-tag">private</span>}
        </div>
      </div>
    );
  }
}

export default MyProjectItem;
