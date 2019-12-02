import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tree from './tree'
import MenuIcon from '../icons/menu'
import CrossIcon from '../icons/cross'
import ScrollManager from 'window-scroll-manager'
import scrollToComponent from 'react-scroll-to-component'
import DropdownMenu from '../../components/elements/dropdown'
import PlusIcon from '../icons/plus'
import Button from '../../components/elements/button'
import { Link } from 'react-router-dom'

const sm = new ScrollManager();

// height of the navbar, not this element
const height = 48
let previousScroll = 0
let positionWhenNotFixed = 300


class TreeFixedTrigger extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    assemblySearchFolder: undefined,
    openTreeMenu: false,
    up: 0,
    key: null,
    fixed: false,
  }

  componentDidMount = () => {
    window.addEventListener('window-scroll', this.setScroll);
  }

  delayOpenMenu = () => {
    document.body.style.overflow = this.state.openTreeMenu ? "auto" : "hidden"
    this.setState({fixedWhenOpen: !this.state.fixedWhenOpen})
    if(!this.state.fixed && !this.state.openTreeMenu) {
      this.timer = setTimeout(() => {
        this.setState({openTreeMenu: !this.state.openTreeMenu})
      }, 200);
    } else {
      this.setState({openTreeMenu: !this.state.openTreeMenu})
    }
  }

  setScroll = (e) => {
    if(!this.bar){
      return
    }
    const rect = this.bar.getBoundingClientRect()
    const { y } = rect
    positionWhenNotFixed = y
    previousScroll = e.detail.scrollPosition
    const shouldBeFixed = y<=0
    if(this.fixed !== shouldBeFixed) {
      this.setState({
        fixed: shouldBeFixed
      })
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('window-scroll', this.setScroll)
    clearInterval(this.timer)
  }

  onItemSelect = (selectedItem) => {
    if(this.state.key !== selectedItem.key){
      let scrollToView = this.state.openTreeMenu
      document.body.style.overflow = "auto"
      this.setState({selectedItem, key: selectedItem.key, openTreeMenu: false, fixedWhenOpen: false})
      if(scrollToView){
        scrollToComponent(this.bar, { offset: 0, align: 'top', duration: 800 })
      }
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if(!this.props.canCommit && nextProps.canCommit) this.setState({fixed: false, openTreeMenu: false})
  }

  render() {
    const {
      addFileButton,
      canCommit,
    } = this.props

    const isTreeVisible = this.props.tree.isVisible
    const showTree = isTreeVisible || canCommit

    let assemblySearchFolder = undefined
    if(this.props.location.folders && this.props.location.folders.length > 1){
      assemblySearchFolder = this.props.tree.root.find(x => x['name'] === this.props.location.folders[0])
      if(assemblySearchFolder && this.props.location.folders.length > 1){
        for (var i = 1; i < this.props.location.folders.length; i++) {
          assemblySearchFolder = this.props.tree[assemblySearchFolder.oid].find(x => x['name'] === this.props.location.folders[i])
        }
        if(assemblySearchFolder){
          assemblySearchFolder = this.props.tree[assemblySearchFolder.oid].find(x => x['name'] === "Assembly Guide.assembly")
        }
      }
    } else if (this.props.location.folders && this.props.location.folders.length > 0) {
      assemblySearchFolder = this.props.tree.root.find(x => x['name'] === this.props.location.folders[0])
      if(assemblySearchFolder){
        assemblySearchFolder = this.props.tree[assemblySearchFolder.oid].find(x => x['name'] === "Assembly Guide.assembly")
      }
    } else {
      assemblySearchFolder = this.props.tree.root.find(x => x['name'] === "Assembly Guide.assembly")
    }
    if(assemblySearchFolder !== this.state.assemblySearchFolder) {
      this.setState({assemblySearchFolder: assemblySearchFolder})
    }

    const treeContainerClasses = [
      'file-tree-container',
    ]
    if(this.state.openTreeMenu) treeContainerClasses.push('open')
    if(this.state.fixed) treeContainerClasses.push('fixed')
    return (
      <div  className={showTree ? "file-tree-column" : "file-tree-column tree-hidden"}>
        <div
          ref={(section) => { this.bar = section; }}
          className="file-tree-scroll-trigger"
        >
          <div
            style={{
              top:  this.state.fixed ? 0 : this.state.fixedWhenOpen ? 0 : positionWhenNotFixed,
              transition: this.state.fixed ? '' : 'top 0.15s ease-in-out',
              transform: `translate3d(0, ${0}px, 0)`
            }}
            className={(this.state.fixedWhenOpen || this.state.fixed) ? "file-tree-control open" : "file-tree-control"}
            onClick={() => this.delayOpenMenu()}>
              <div className="name-container">
              {this.state.selectedItem}{this.state.openTreeMenu ? <CrossIcon /> : <MenuIcon />}
              </div>
          </div>
        </div>
        <div  style={{
              top: height,
              height: '100%'
            }} className={treeContainerClasses.join(' ')}>
          <div className="file-tree-non-fixed-container">
          <div className="file-tree-scrolling-div">

        {false &&
          <div style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }} className="hidden-in-small">{canCommit &&
            <div style={{display: 'flex'}}>
            </div>
          }</div>
        }
          <Tree
            canCommit
            selectedItem={this.onItemSelect}
            {...this.props}
          />
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TreeFixedTrigger;
