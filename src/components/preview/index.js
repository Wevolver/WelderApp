import React, {Component} from 'react'

import {previewerFileTypes} from '../../constants/previewerFileTypes'
import StepPreview from '../../components/preview/stepPreview'
import QuillEditor from '../../components/editor/quill'
import loadable from '@loadable/component'
import AssemblyGuide from '../../containers/AssemblyGuide'
import DocumentLoader from '../../components/elements/loader/documentLoader'
import Scene from '../../components/preview/three'
import {decodeUTF8} from '../../modules/helpers'
import {Helmet} from "react-helmet";
import ImagePreview from './image'

import './previewer.css'

const Editor = loadable(() => import('../../components/editor'))
const PdfPreview = loadable(() => import('../../components/preview/pdfPreview'))

class Preview extends Component {

  componentDidMount = () => {
    const {location, selectedProject, getProjectFile} = this.props
    if (selectedProject && this.props.isPreviewable)
      getProjectFile(location.folderPath, 'latest')
  }

  componentWillReceiveProps = (nextProps) => {
    const {selectedProject, location, editFileToggle, editing} = this.props
    if (location.folderPath !== nextProps.location.folderPath || location.branch !== nextProps.location.branch) {
      if (nextProps.isPreviewable) {
        this.props.getProjectFile(nextProps.location.folderPath, 'latest')
      }
    }
    if (location.folderPath !== nextProps.location.folderPath)
      editFileToggle(false)
  }

  getPreviewer = () => {
    const {
      location,
      file,
      openModal,
      projectName,
      editing,
      editFileToggle,
      canCommit
    } = this.props
    if (file && location.fileExtension.type) {
      const extension = location.fileExtension.type.toLowerCase()
      if (previewerFileTypes.wevolverType.indexOf(extension) > -1) {
        let str = ''
        if ("TextEncoder" in window) {
          let enc = new TextDecoder("utf-8");
          str = enc.decode(file)
        } else {
          str = decodeUTF8(new Uint8Array(file))
        }
        return (<QuillEditor isProjectEditor editFileToggle={() => editFileToggle(false)} intialValue={str} openModal={openModal} location={location} projectName={projectName} onChange={(markdown) => this.props.editFile(markdown)} editing={editing}/>)
      } else if (previewerFileTypes.markdown.indexOf(extension) > -1) {
        let str = ''
        if ("TextEncoder" in window) {
          let enc = new TextDecoder("utf-8");
          str = enc.decode(file)
        } else {
          str = decodeUTF8(new Uint8Array(file))
        }
        return (<Editor editFileToggle={() => editFileToggle(false)} intialValue={str} openModal={openModal} location={location} projectName={projectName} onChange={(markdown) => this.props.editFile(markdown)} editing={editing}/>)
      } else if (previewerFileTypes.assemblyGuideType.indexOf(extension) > -1) {
        let str = ''
        if ("TextEncoder" in window) {
          let enc = new TextDecoder("utf-8");
          str = enc.decode(file)
        } else {
          str = decodeUTF8(new Uint8Array(file))
        }
        return (<AssemblyGuide canCommit={canCommit} initialValue={JSON.parse(str || '{}')}/>)
      } else if (previewerFileTypes.stl.indexOf(extension) > -1) {
        const blob = new Blob([file], {type: 'application/octet-stream'})
        const url = URL.createObjectURL(blob)
        return (<Scene src={url} type="stl"/>)
      } else if (previewerFileTypes.step.indexOf(extension) > -1) {
        const blob = new Blob([file], {type: 'application/octet-stream'})
        const url = URL.createObjectURL(blob)
        return (<StepPreview src={url}/>)
      } else if (previewerFileTypes.image.indexOf(extension) > -1) {
        return (<ImagePreview file={file}/>)
      } else if (previewerFileTypes.pdf.indexOf(extension) > -1) {
        return (<PdfPreview loading={''} file={file}  />)
      } else if (previewerFileTypes.text.indexOf(extension) > -1) {
        let fileString = null
        try {
          fileString = String.fromCharCode.apply(null, new Uint8Array(file))
        } catch (err) {
          console.log(err)
        }
        if (!fileString)
          return null
        return (<div className="text-preview-wrapper" style={{
            whiteSpace: 'pre',
            maxWidth: '100%',
            overflowX: 'auto'
          }}>{fileString}</div>)
      }
    } else {
      return <div/>
    }
  }
  render() {
    const {file, isPreviewable, isRunning, privateProject, location} = this.props
    const previewer = this.getPreviewer()
    const extension =  (file && location.fileExtension.type)? location.fileExtension.type.toLowerCase() : null
    const isImageFile = previewerFileTypes.image.indexOf(extension) > -1 || previewerFileTypes.step.indexOf(extension) > -1 || previewerFileTypes.stl.indexOf(extension) > -1
    if (isRunning)
      return <DocumentLoader type={isImageFile ? 'other' : 'text'}/>
    if (!isPreviewable || (isPreviewable && !previewer))
      return (<div className="non-previewable">
        <div className="title">We're unable to preview this file</div>
        <div>Download this file if you have a program on your computer to view this filetype.</div>
      </div>)
    return (<div>
      <Helmet>
        <meta name="robots" content={privateProject ? "noindex" : "index"} data-react-helmet="true"/>
      </Helmet>
      {previewer}
      {!file && <DocumentLoader type={isImageFile ? 'other' : 'text'}/>}
    </div>)
  }
}

export default Preview
