import React, { Component } from 'react'
import moment from 'moment'
import BookmarkButton from '../../../containers/BookmarkButton'


class ProjectUpdatedTime extends Component {

  componentDidMount = () => {
    const {
      getProjectHistory,
      project
    } = this.props
    // getProjectHistory()
  }

  render () {
    const {
      project,
      lastCommitTime,
    } = this.props
    if(!project) return null
    const isFollowing = !!project.bookmarked
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
        <p className="last-updated" style={{fontSize: 12, color: '#757575', alignSelf: 'flex-end', margin: '0', marginBottom: '.2rem'}}> {lastCommitTime ? `updated ${moment.unix(lastCommitTime).format("MMM D, YYYY")}` : '-'}</p>
        <BookmarkButton isFollowing={isFollowing} projectOid={project && project._id ? project._id.$oid : ""} count={project.bookmark_count}/>
      </div>
    )
  }
}

export default ProjectUpdatedTime
