import React, { Component } from 'react'
import SubNavbar from '../../../components/navbar/subNavbar'
import { Link } from 'react-router-dom'
import ProjectTags from './projectTags'
import MainContainer from '../../../components/layout/mainContainer'
import BookmarkButton from '../../../containers/BookmarkButton'
import CogIcon from '../../icons/cog'
class ProjectFooter extends Component {
  render () {
    const {
      project,
      auth,
      canCommit,
    } = this.props
    if(!project) return null
    return(
      <div className="project-footer">
        <MainContainer>
          <div className="project-footer-content">
            <div className="footer-project-title">
              <h4 style={{margin: 0, textAlign: 'left'}}>{project.name}</h4>
              {(!auth.isRunning && !canCommit) && <BookmarkButton isFollowing={!!project.bookmarked}  projectOid={project && project._id ? project._id.$oid : ""} />}
            </div>
            {project && project.tags && project.tags.length > 0 && <div className="project-footer-tags">
              <span style={{color: '#757575', marginRight: '10px'}}> Tags: </span>
              <ProjectTags tags={project.tags} />
            </div>}
          </div>
        </MainContainer>
      </div>
    )
  }
}

export default ProjectFooter
