import React, { Component } from 'react'
import FileList from './fileList'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Loader from '../elements/loader'
import Button from '../elements/button'
import ChevronLeftIcon from '../icons/chevron-left'
import ChevronRightIcon from '../icons/chevron-right'

class CommitTable extends Component {

  render() {
    const {
      commits,
      selectedId,
      selectedProject,
      onCommitSelect,
      page,
      location,
      loading
    } = this.props

    return (
      <div style={{
          position: 'relative'
        }}>
      {(commits && loading) && <div
        style={{
          position: 'absolute',
          background: 'white',
          opacity: 0.8,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader />
      </div>}
      {commits &&
        <table style={{tableLayout: 'fixed'}}>
        <thead style={{textAlign: 'left'}}>
          <tr>
            <th style={{fontWeight: 300, fontSize: 22}}>Author</th>
            <th style={{fontWeight: 300, fontSize: 22}}>Message</th>
            <th style={{fontWeight: 300, fontSize: 22}}>Date</th>
          </tr>
        </thead>
        <tbody>
        {commits.map((commit, index) => 
          <tr style={{fontSize: 14}}key={commit.commit_id}>
            <td valign="top" style={{width: 140, padding: '8px 0'}}>
              {commit.committer_name}
            </td>
            <td  style={{width: 700, paddingTop: 8, paddingBottom: 8}}>
              {commit.commit_id !== selectedId &&
                <div>
                <Link to={`/${selectedProject}/${commit.commit_id}/${location.type}/${location.folderPath || ''}`} onClick={onCommitSelect}>
                  {commit.commit_title}
                </Link>
                </div>
              }
              {commit.commit_id === selectedId &&
                <div className="commit-selected">
                  {commit.commit_title}
                </div>
              }
              {commit.commit_description && <span className="gray">...{commit.commit_description}</span>}
              {commit.commit_files && <FileList
                files={commit.commit_files}
              />}
            </td>
            <td valign="top"  style={{width: 120}}>
              {moment.unix(commit.commit_time).format("YYYY-MM-DD")}
            </td>
          </tr>
        )}
        </tbody>
        </table>
      }

      {!commits && <Loader />}
      </div>
    )
  }
}

export default CommitTable
