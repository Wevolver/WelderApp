import React, { Component } from 'react';

import Loader from '../elements/loader'
import CommitTable from './commitTable'

class FileHistory extends Component {
  
  componentWillMount = () => {
    const {
      getFileHistory
    } = this.props
    getFileHistory()
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      dispatch,
      match,
      project,
      files,
    } = nextProps
    // if(project && files && !files.history) {
    //   dispatch(getFileHistory(
    //     `${project.project_uri}/readhistory?type=file&path=${match.params.folderPath}&branch=${match.params.branch}`,
    //     `${match.params.userSlug}/${match.params.projectSlug}/${match.params.folderPath}`,
    //   ))
    // }
  }

  getFile = (oid) => {
    const {
    } = this.props

  }

  render() {
    const {
      fileHistory,
      selectedProject,
      location
    } = this.props
    let selectedId = null
    if (fileHistory) selectedId = location.branch === 'master' && fileHistory ? fileHistory[0].commit_id : location.branch
    return (
      <div>
        <CommitTable
          commits={fileHistory}
          selectedId={selectedId}
          location={location}
          selectedProject={selectedProject}
          page={0}
          pagingEnabled={false}
        />
      </div>
    );
  }
}


export default FileHistory;
