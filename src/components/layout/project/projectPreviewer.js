import React, { Component } from 'react'
import moment from 'moment'
import BookmarkButton from '../../../containers/BookmarkButton'
import ResultTile from '../../searchPage/resultTile'
import Loader from '../../../components/elements/loader'
import ScrollingBox from '../../../components/box/scrollingBox'
import LinkIcon from '../../icons/link'
import PencilIcon from '../../icons/pencil'
import DownloadIcon from '../../icons/download'
import Button from '../../../components/elements/button'
import Preview from '../../../containers/Preview'
import FileHistory from '../../../containers/FileHistory'
import { toast } from '../../../modules/toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import TrashIcon from '../../icons/trash'
import { API } from '../../../constants/api'
import { previewerFileTypes } from '../../../constants/previewerFileTypes'

class ProjectPreviewer extends Component {

  render () {
    const {
      editing,
      location,
      historyView,
      editFileToggle,
      treeLoaded,
      canCommit,
      project,
      deleteFile,
      fileHistoryToggle,
      downloadFile,
      isTreeVisible
    } = this.props

    if(!project) return null
    const WelderPermissions = localStorage.getItem('WelderPermissions')
    const fileUrl = `${API.welderUrl}/${location.userSlug}/${project.name}/readfile?path=${location.folderPath}&permissions=${WelderPermissions}`
    const onMaster = location.branch === 'master'
    const extension = location.fileExtension &&  location.fileExtension.type ? location.fileExtension.type.toLowerCase() : ''
    const isImage = previewerFileTypes.image.indexOf(extension) > -1

    let canDownload = (previewerFileTypes.assemblyGuideType.indexOf(extension) < 0 && previewerFileTypes.wevolverType.indexOf(extension) < 0 && previewerFileTypes.markdown.indexOf(extension) < 0 && project.version === '3') && !editing
    if(project.version === '2') {
      canDownload = !editing
    }
    if(location.type !== 'blob') return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400}}></div>
    const showTree = isTreeVisible || canCommit
    const wrapperClass = showTree ? "eight columns border-left open-tree"  : "eight columns closed-tree" 
    return(
      <div className={wrapperClass} >
        <ScrollingBox
          className="padding-left"
          type="no-border"
          menuDisabled={!!editing}
          menu={
            <div style={{display: 'flex', marginBottom: '1rem'}}>

            {(!editing && isImage) && <CopyToClipboard text={fileUrl}>
              <Button
                onClick={() => toast("success","This file\'s URL was copied to your clipboard")}
                icon={<LinkIcon fill="#ffffff"/>}
                square
              />
            </CopyToClipboard>}

            {canCommit && !editing && <Button label="File History" typeClass={historyView ? 'toggled' : ''} onClick={() => fileHistoryToggle(!historyView)}/>}
            {canDownload && <Button onClick={() => downloadFile()} icon={<DownloadIcon fill="#ffffff"/>} square/>}
            {(!editing && location.fileExtension.editable && canCommit && onMaster && !historyView) &&
              <div className="hidden-in-small">
                <Button icon={<PencilIcon fill="#ffffff"/>} square disabled={!canCommit || historyView} onClick={editFileToggle}/>
              </div>
            }
            {(canCommit && onMaster && !editing) &&  <div className="hidden-in-small"><Button onClick={() => deleteFile()} icon={<TrashIcon fill="#ffffff"/>} disabled={!canCommit} square /></div>}
            </div>
          }
        >
          {!historyView &&
            <Preview
             canCommit={canCommit}
             privateProject={project.privacy === 2}
             match={this.props.match}
            />
          }
          {treeLoaded && historyView &&
            <FileHistory
            />
          }
          {!treeLoaded && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400}}></div>}
        </ScrollingBox>
      </div>
    )
  }
}

export default ProjectPreviewer
