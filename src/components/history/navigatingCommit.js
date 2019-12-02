import React, { Component } from 'react'
import './history.css'

import MainContainer from '../../components/layout/mainContainer'
import Loader from '../elements/loader'
import FileList from '../history/fileList'
import moment from 'moment'

class NavigatingCommit extends Component {
  
  componentWillMount = () => {
    const {
      getCommitDetails,
      location,
    } = this.props
    if(location && location.branch !== 'master') getCommitDetails(location.branch)
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      location,
      getCommitDetails
    } = this.props

    if(location.branch !== nextProps.location.branch) {
      getCommitDetails(nextProps.location.branch)
    }

  }
  render() {
    const {
      project,
      location
    } = this.props
    const commitDetails = project[`history/${location.branch}`]
    if(!location || location.branch === 'master') return null
    return (
      <div className="past-commit-container">
        {commitDetails &&
          <MainContainer>
            <div style={{display: 'flex', alignItems: 'flex-start'}}>
            <div className="user-container" style={{paddingBottom: 8}}>
              <div className="user-avatar small" />

              <div>
              <div>
              <b>{commitDetails[0].committer_name}</b>
              </div>
              <div className="gray">
              {moment.unix(commitDetails[0].commit_time).format("YYYY-MM-DD")}
              </div>
              </div>
            </div>
            <div style={{marginLeft: 24}}>
            <div className="past-commit-description">
            {commitDetails[0].commit_title}...{commitDetails[0].commit_description}
            </div>
            <FileList
              files={commitDetails[0].commit_files}
            />
            </div>
            </div>
          </MainContainer>
        }
        {!commitDetails &&
          <Loader />
        }
      </div>
    );
  }
}

export default NavigatingCommit;

