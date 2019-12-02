import React, { Component } from 'react';
import './profile.css';

import { Link } from 'react-router-dom'
import BookmarkButton from '../../../containers/BookmarkButton'

class ProjectItem extends Component {
  render() {
    const {
      project,
      noFollow
    } = this.props
    return (
      <div className="project-item-container">

        <div className="project-item-avatar">
          {project.picture && <div
            className='profile-avatar-background-image'
            style={{backgroundImage: `url(${project.picture.source})`}}
          />}
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
          <BookmarkButton isFollowing={project.bookmarked || true} projectOid={project && project._id ? project._id.$oid : ""} />
        </div>

        <div className="mobile-profile-project">
          <div className="mobile-project-item-header">
            <Link to={`${project.link}`}>{project.name}</Link>
            <BookmarkButton isFollowing={project.bookmarked} projectOid={project && project._id ? project._id.$oid : ""} square/>
          </div>
          <div className='profile-project-description'>{project.description}</div>
          <div style={{color: '#757575', fontSize: 14}}>{project.university === "none" ? "" : project.university}</div>
          {project.privacy === 2 && <span className="private-tag">private</span>}
        </div>
      </div>
    );
  }
}

export default ProjectItem;
