import React, { Component } from 'react'
import SubNavbar from '../../../components/navbar/subNavbar'
import { Link } from 'react-router-dom'
import Button from '../../../components/elements/button'
import ProjectUpdatedTime from '../../../containers/Project/ProjectUpdatedTime'
import ProjectTags from './projectTags'
import CommentsButton from '../../../containers/Comments/CommentsButton'
import CogIcon from '../../icons/cog'


class ProjectTitle extends Component {

  render () {
    const {
      canCommit,
      project,
      user,
      location,
      auth,
      openModal
    } = this.props

    if(!project) return null
    let projectHeader = (project.bookmarked && auth.isAuthenticated) ? "" : "user-project-header"
    if(canCommit){
      projectHeader += ' no-time'
    }
    const isNavigatingCommit = location.branch !== 'master'

    return(
      <SubNavbar style={{background: 'white', borderBottom: 'none'}} fitted>
        <div className="title-holder" id="site-content" style={{ maxWidth: '60%', minHeight: '84px' }}>
          {
            !project.version === '3' &&
            <Link to={`/profile/${location.userSlug}/`}>
              <div>{user && user[location.userSlug] && user[location.userSlug].name || ""}</div>
            </Link>
          }
          {
            project.version === '3' &&
            <div className="university-name">{project.university}</div>
          }
          <h3 data-tip={project.name.length > 40 ? project.name : ""} className="project-title">{project.name.length > 40 ? project.name.slice(0, 35).trim() + '...' : project.name}</h3>
          <ProjectTags tags={project.tags} />
        </div>
        <div>
        <div className={projectHeader} style={{height: '100%', display:'flex', alignItems:'flex-end', flexWrap: 'wrap', padding: '10px 0 10px'}}>
          {
            isNavigatingCommit &&
            <div className='history-action-buttons'>
              <Link to={`/${location.userSlug}/${location.projectSlug}/master/tree`}>
                <Button label="Back to Latest" typeClass="action" />
              </Link>
            {
              canCommit &&
              <div className="hidden-in-small"><Button label="Restore This Revision" onClick={() => openModal('restoreRevision')}/></div>
            }
            </div>
          }
          <CommentsButton />
          {
            project.version !== '3' &&
            <div className="hidden-in-small">
              <Button label="Clone" onClick={() => openModal('clone')}/>
            </div>
          }
          {
            canCommit &&
            <Button label="Project History" onClick={() => openModal('projectHistory')}/>
          }

          {
            !canCommit &&
            <ProjectUpdatedTime />
          }
          {
            user.selected && canCommit &&
            <div className="hidden-in-small">
              <Button icon={<CogIcon fill="#fff"/>} square onClick={() => { openModal('projectSettings')}}/>
            </div>
          }
        </div>
        <p style={{minHeight: '18px',marginTop: 0, textAlign: 'right'}}>{project.license}</p>
        </div>
      </SubNavbar>
    )
  }
}

export default ProjectTitle
