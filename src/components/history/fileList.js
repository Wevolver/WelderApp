import React, { Component } from 'react'
import ChevronDownIcon from '../../components/icons/chevron-down'
import ChevronUpIcon from '../../components/icons/chevron-up'

const changeType = ['-','+','⚬']
const filesChangedMax = 10

class FileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }
  render() {
    const {
      files
    } = this.props

    return (
      <div>
        {this.state.expanded &&
          <div className="file-list-container">
            {files.slice(0, filesChangedMax).map(file =>
              <div className="file-list-item" key={file.path}>
                <div className="file-status-symbol">{changeType[file.status - 1]}</div>
                <div className="file-path">{file.path}</div>
              </div>
            )}
            {files.length > filesChangedMax &&
              <div className="file-path">
                ... and {files.length - filesChangedMax} other file{files.length - filesChangedMax === 1 ? '':'s'}.
              </div>
            }
          </div>
        }
        {files.length > 0 &&
          <div onClick={() => this.setState({expanded: !this.state.expanded})} className="files-expand-button">
            <div style={{display: 'flex', alignItems: 'center'}}>
            {files.length} changed file{files.length === 1 ? '':'s'}
            {this.state.expanded &&
              <ChevronUpIcon style={{width: 11, height: 11, marginLeft: 6}}/>
            }
            {!this.state.expanded  &&
              <ChevronDownIcon style={{width: 11, height: 11, marginLeft: 6}}/>
            }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default FileList
