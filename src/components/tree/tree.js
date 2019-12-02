import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from '../../components/elements/loader/treeLoader'
import FolderIcon from '../icons/folder'
import DocumentIcon from '../icons/document'
import MarkdownDocumentIcon from '../icons/markdown-document'
import AssemblyDocumentIcon from '../icons/assembly-document'
import ChevronDownIcon from '../icons/chevron-down'
import HomeIcon from '../icons/home'
import DropdownMenu from '../../components/elements/dropdown'
import PlusIcon from '../icons/plus'
import ReactTooltip from 'react-tooltip'
import Button from '../../components/elements/button'

import './tree.css';
const heightItem = 30;
let treeItems = []
let listOfFiles = []
let openFolders = {}

function compareName(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  } if (nameA.endsWith('.MD') && !nameB.endsWith('.MD')){
    comparison = -1;
  } else if (!nameA.endsWith('.MD') && nameB.endsWith('.MD')) {
    comparison = 1;
  }

  if (nameA === "OVERVIEW.WEVOLVER"){
    comparison = -1;
  } else if (nameB === "OVERVIEW.WEVOLVER"){
    comparison = 1;
  } else if (nameA === "OVERVIEW.MD"){
    comparison = -1;
  } else if (nameB === "OVERVIEW.MD") {
    comparison = 1;
  } else if (nameA === "DOCUMENTATION.MD"){
    comparison = -1;
  } else if (nameB === "DOCUMENTATION.MD") {
    comparison = 1;
  } else if (nameA === "README.MD"){
    comparison = -1;
  } else if (nameB === "README.MD"){
    comparison = 1;
  }

  return comparison
}

function compareType(a, b) {
  const nameA = a.type.toUpperCase();
  const nameB = b.type.toUpperCase();
  let comparison = 0;
  if (nameA > nameB) {
    comparison = -1;
  } else if (nameA < nameB) {
    comparison = 1;
  }
  return comparison;
}

class Tree extends Component {

  bytesToHuman(bytes, precision) {
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes) || parseFloat(bytes) == 0) return '';
    if (typeof precision === 'undefined') precision = 0;
    var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB']
    var number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
  }

  cutName(original, version) {
    if (!original)
      return null
    if(version === '3' && original.endsWith('.md')){
      original = original.substring(0, original.length - 3)
    }

    if(original.endsWith('.wevolver')){
      original = original.substring(0, original.length - 9)
    }

    if(original.endsWith('.assembly')){
      original = original.substring(0, original.length - 9)
    }

    if (original && original.length < 25){
      return original
    }

    let split = original.split('.')
    let extension = ''
    if(split.length > 1) extension = '.' + split.slice(-1)
    let fileName = split[0]
    let lastCharsOfName = fileName.slice(-2)
    return fileName.slice(0, 16) + '...' +   lastCharsOfName + extension.slice(0,5)
  }

  getTree = (nextProps) => {
    this.setState({openTreeOnFirstLoad: true})
    this.props.getProjectTree()
  }

  refreshTree = () => {
    this.props.invalidateTree()
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const {
      tree,
      location,
    } = nextProps

    if((!tree.loaded && this.props.tree.loaded !== nextProps.tree.loaded) ||
      (location.branch !== this.props.location.branch)) {
      this.getTree(nextProps)
    }
  }

  state = {
    needsUpdate: false,
    openTreeOnFirstLoad: true,
    treeButtonHoverPath: ""
  }

  openTree = (node) => {
    const {
      location
    } = this.props
  }

  countChildren = (folder, children) => {
    const {
      tree,
      location
    } = this.props

    children.forEach(child => {
      if(children && !child.hidden) folder.childrenCount += 1
      if(tree[child.oid] && !!openFolders[child.folder_path]) {
        this.countChildren(folder, tree[child.oid])
      }
    })
  }

  sortTree = (tree) => {
    let listItems = {folders: [], files: [], markdown: []}
    tree.forEach((item) => {
      if(item.type === 'tree') {
        listItems.folders.push(item)
      } else {
        if(item.name.split('.').pop() == 'md' || item.name.split('.').pop() == 'wevolver'){
          listItems.markdown.push(item)
        } else{
          listItems.files.push(item)
        }
      }
    })
    return listItems.markdown.sort(compareName).concat(listItems.folders.sort(compareName).concat(listItems.files.sort(compareName)))
  }

  lookForAssembly= (tree, path) => {
    let searchPath = tree.root.find(folder => folder['name'] === path.split('/')[0])
    if(!!!searchPath){
      path.split('/').slice(1).forEach(folder => {
        searchPath = tree[searchPath.oid].find( blob => blob['oid'] === folder.oid)
      })
    }
    let assemblyExists = null
    if(searchPath){
      assemblyExists = tree[searchPath.oid].find( blob => blob['name'] === "Assembly Guide.assembly")
    } else {
      assemblyExists = tree["root"].find( blob => blob['name'] === "Assembly Guide.assembly")
    }
    return !!assemblyExists;
  }

  parseTreeNode = (nodes, level, folderPath) => {
    const {
      tree,
      location,
      removeEditingGuide,
      uploadingGuide,
      project,
      canCommit
    } = this.props

    const folderItems = []
    let childrenDivs = null
    nodes.forEach(node => {
      let classType = "tree-item"
      let link = `/${location.userSlug}/${location.projectSlug}/${location.branch}/${node.type}/${node.folder_path}`
      let nodeFolderPath = ""
      if(folderPath){
        nodeFolderPath =  folderPath + "/" + node.folder_path.split("/").slice(-1)[0]
        link = `/${location.userSlug}/${location.projectSlug}/${location.branch}/${node.type}/${nodeFolderPath}`
      }
      let onClickF = () => null
      if(listOfFiles.indexOf(node.folder_path) < 0) listOfFiles.concat([node.folder_path])
      if(this.cutName(node.name, project.version).startsWith('.')){
        node.hidden = true
      }
      let selected = (node.folder_path === location.folderPath)
      if(folderPath){
        selected = (location.folderPath === nodeFolderPath)
      }
      if(selected) classType = "tree-item selected"
      let icon = <DocumentIcon style={{width: 16, height: 16}} fill="#0277bc"/>
      if(node.name.endsWith('.md') || node.name.endsWith('.wevolver')){
        icon = <MarkdownDocumentIcon style={{width: 16, height: 16}} fill="#0277bc"/>
      }
      if(node.name.endsWith('.assembly')){
        icon = <AssemblyDocumentIcon style={{width: 16, height: 16}} fill="#0277bc"/>
      }
      if(node.type === 'tree') {
        node.open = !!openFolders[node.folder_path]
        if (this.state.openTreeOnFirstLoad && location.folderPath) {
          const levelFolderPath = location.folderPath.split('/').slice(0, level + 1).join('/')
          if(node.folder_path === levelFolderPath) openFolders[node.folder_path] = true
        }
        link = `/${location.userSlug}/${location.projectSlug}/${location.branch}/${node.type}/${node.folder_path}`
        onClickF = () => {
          openFolders[node.folder_path] = !!!openFolders[node.folder_path]
          this.forceUpdate()
        }
        icon = <FolderIcon style={{width: 16, height: 16}} fill="#0277bc"/>
      }

      if(tree[node.oid]) {
        node.childrenCount = 0
        this.countChildren(node, tree[node.oid])
        let treeItems = this.sortTree(tree[node.oid])
        childrenDivs = this.parseTreeNode(treeItems, level + 1, node.folder_path)
      }

      if(selected && this.props.selectedItem) {
        this.props.selectedItem(
          <div key={node.oid}>
           <div className={classType} style={{height: heightItem}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                {node.name.endsWith('.md') || node.name.endsWith('.wevolver') ? <MarkdownDocumentIcon style={{width: 16, height: 16}} fill="#424242"/> : <DocumentIcon style={{width: 16, height: 16}} fill="#424242"/>}
                <div data-tip={node.name.length > 24 ? node.name : ""} style={{marginLeft: 8}}>{this.cutName(node.name, project.version)}</div>
              </div>
            </div>
          </div>
        )
      }
      if(!node.hidden) {
        folderItems.push(
          <div className="folder-wrapper" key={node.oid} style={{height: node.open ? ((node.childrenCount + 1) * heightItem) : heightItem}}>
            {node.type === 'tree' &&
              <div onMouseEnter={() => this.setState({treeButtonHoverPath: node.folder_path})} style={{cursor: 'pointer', height: heightItem}} className={classType} onClick={onClickF}>
                <div style={{display: 'flex', alignItems: 'center', paddingLeft: level * 22}}>
                  <div className={node.open ? "folder-arrow open" : "folder-arrow"}>{node.type === 'tree' ? <ChevronDownIcon style={{width:'12px', height:'12px'}} stroke="#0277bc"/>: ''}</div>
                  {icon}
                  <a data-tip={node.name.length > 24 ? node.name : ""} style={{cursor: 'pointer', marginLeft: 8, whiteSpace: 'nowrap'}}>{this.cutName(node.name, project.version)}</a>
                </div>

                {this.state.treeButtonHoverPath === node.folder_path &&  canCommit &&
                  <div className="hidden-in-small">
                      <DropdownMenu
                      ref="dropdown"
                      files
                      label={
                        <div>
                          <Button className="action add-button" onClick={(e) => openFolders[node.folder_path] = false} icon={<PlusIcon fill={'#424242'}/>} square/>
                        </div>
                      }
                    >
                    <p style={{marginTop: 0, fontWeight: 600}}> New: </p>
                    <div>
                      <Button disabled={!canCommit  || uploadingGuide || this.lookForAssembly(tree, node.folder_path)} className="drop-down-item" onClick={() => {
                          removeEditingGuide()
                          this.props.openModal('editAssemblyStep', node.folder_path)}
                      } label="Assembly Guide" typeClass="subtle"/>
                      <Button disabled={!canCommit} className="drop-down-item" onClick={() => this.props.openModal('uploadFiles', node.folder_path)} label="File/Folder" typeClass="subtle"/>
                      <Button disabled={!canCommit} className="drop-down-item" onClick={() => this.props.openModal('addText', node.folder_path, tree)} label="Text" typeClass="subtle"/>
                    </div>
                    </DropdownMenu>
                  </div>
                }

              </div>
            }
            {node.type !== 'tree' &&
              <Link  to={link} className={classType} style={{height: heightItem}}>
                <div style={{display: 'flex', alignItems: 'center', paddingLeft: level * 16}}>
                  <div className={node.open ? "folder-arrow open" : "folder-arrow"}>{node.type === 'tree' ? '▾' : ''}</div>
                  {icon}
                  <div data-tip={node.name.length > 24 ? node.name : ""} style={{marginLeft: 8, whiteSpace: 'nowrap'}}> {this.cutName(node.name, project.version)} </div>
                  </div>
                <div className="file-size" style={{flexShrink: 0}}>{((!node.name.endsWith('.assembly') && !node.name.endsWith('.wevolver') && !node.name.endsWith('.md')) || project.version !== '3') && this.bytesToHuman(node.size)}</div>
              </Link>
            }
            {node.open && childrenDivs}
            <ReactTooltip border={true} type="light" effect="solid" place="bottom"  />
          </div>
        )
      }
    })

    if(this.state.openTreeOnFirstLoad) this.setState({openTreeOnFirstLoad: false})
    return folderItems
  }

  render() {
    const {
      tree,
      location,
      canCommit,
      redirect,
      removeEditingGuide,
      uploadingGuide,
      project,
    } = this.props

    if(!tree.loaded) return(<div> <div style={{paddingTop: '8px', textAlign: 'right'}}> {!canCommit && <div style={{height: '40px'}}></div>} {canCommit && <Button disabled className="action add-button" style={{backgroundColor: '#f7f7f7', marginRight: 0 }} icon={<PlusIcon />} square />} </div><div style={{marginLeft: 8, whiteSpace: 'nowrap', fontSize: '.8rem', color: '#bdbdbd'}}>Files:</div><Loader /></div>)
    let wevolverOverview = tree.root.find(x => x.name.toLowerCase() === "overview.wevolver")
    let documentation = tree.root.find(x => x.name.toLowerCase() === "documentation.md")
    let overview = tree.root.find(x => x.name.toLowerCase() === "overview.md")
    let readme = tree.root.find(x => x.name.toLowerCase() === "readme.md")
    const search = window.location.search
    if(location.type !== 'blob' && tree.loaded && !project.overview){
      if(wevolverOverview){
          let folderPath = wevolverOverview.folder_path.split('/');
          folderPath.pop();
          folderPath = folderPath.join('/') !== '' ? folderPath.join('/') : undefined;
          if(folderPath === location.folderPath){
            let redirectLink = `/${location.userSlug}/${location.projectSlug}/${location.branch}/${wevolverOverview.type}/${wevolverOverview.folder_path}${search}`
            redirect(redirectLink)
          }
      } else if(overview){
          let folderPath = overview.folder_path.split('/');
          folderPath.pop();
          folderPath = folderPath.join('/') !== '' ? folderPath.join('/') : undefined;
          if(folderPath === location.folderPath){
            let redirectLink = `/${location.userSlug}/${location.projectSlug}/${location.branch}/${overview.type}/${overview.folder_path}${search}`
            redirect(redirectLink)
          }
      } else if (documentation) {
          let folderPath = documentation.folder_path.split('/');
          folderPath.pop();
          folderPath = folderPath.join('/') !== '' ? folderPath.join('/') : undefined;
          if(folderPath === location.folderPath){
            let redirectlink = `/${location.userSlug}/${location.projectSlug}/${location.branch}/${documentation.type}/${documentation.folder_path}${search}`
            redirect(redirectlink)
          }
      } else if (readme) {
          let folderPath = readme.folder_path.split('/');
          folderPath.pop();
          folderPath = folderPath.join('/') !== '' ? folderPath.join('/') : undefined;
          if(folderPath === location.folderPath){
            let redirectlink = `/${location.userSlug}/${location.projectSlug}/${location.branch}/${readme.type}/${readme.folder_path}${search}`
            redirect(redirectlink)
          }
      }
    }

    let listItems = this.sortTree(tree.root)
    treeItems = this.parseTreeNode(listItems, 0)
    this.props.onFileList(listOfFiles)
    return (

      <div onMouseLeave={() => this.setState({treeButtonHoverPath: ""})} >
        {
          project && project.overview && project.overview.summary &&
          <div className="overview-link">
          <Link to={`/${location.userSlug}/${location.projectSlug}`} className={location.folderPath ? "tree-item" : "tree-item selected"} style={{height: 30, marginBottom: 0}}>
            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 20}}>
              <HomeIcon width={16} height={16} fill="#0277bc"/>
              <div style={{marginLeft: 6, whiteSpace: 'nowrap'}}>Overview</div>
            </div>
          </Link>
          </div>
        }
      <div className="tree-file-item-list" style={{paddingBottom: 100}}>
        {
          (this.state.treeButtonHoverPath !== "" || !canCommit) &&
          <div onMouseEnter={() => this.setState({treeButtonHoverPath: ""})}  style={{height: '40px'}}></div>
        }
        {this.state.treeButtonHoverPath === "" && canCommit &&
        <div onMouseEnter={() => this.setState({treeButtonHoverPath: ""})} style={{paddingTop: '8px', textAlign: 'right'}} className="hidden-in-small">
          <DropdownMenu
            ref="dropdown"
            files
            label={
              <div>
                  <Button className="action add-button" icon={<PlusIcon />} square />
              </div>
            }
          >
          <p style={{textAlign: 'left', marginTop: 0, fontWeight: 600}}>New: </p>
          <div>
            <Button disabled={!canCommit || uploadingGuide || !!listItems.find(file => file['name'] === "Assembly Guide.assembly")} className="drop-down-item" onClick={() => {
                removeEditingGuide()
                this.props.openModal('editAssemblyStep', '')
              }
            } label="Assembly Guide" typeClass="subtle"/>
            <Button disabled={!canCommit} className="drop-down-item" onClick={() => this.props.openModal('uploadFiles', '')} label="File/Folder" typeClass="subtle"/>
            <Button disabled={!canCommit} className="drop-down-item" onClick={() => this.props.openModal('addText', '', tree)} label="Text" typeClass="subtle"/>
          </div>
          </DropdownMenu>
        </div>
        }
        {treeItems.length > 0 &&
          <div style={{display: 'flex', alignItems: 'center', paddingLeft: 0}}>
            <div style={{marginLeft: 8, whiteSpace: 'nowrap', fontSize: '.8rem', color: '#bdbdbd'}}>Files:</div>
          </div>
        }
        {treeItems}
      </div>
      </div>
    );
  }
}


export default Tree;
